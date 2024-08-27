import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled, ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import typeDefs from "./logic/schemaGQL.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import cors from 'cors'
import express from 'express';
import http from 'http';
import path from 'path';
const __dirname = path.resolve();

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}
const MONGO_URI = process.env.DATABASE_URL;
const SECRATE = process.env.SECRATE;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error", (err) => {
    console.log("error connecting", err)
})

import './DB/User.js'
import './DB/SubWaiting.js'
import './DB/Sub.js'
import './DB/Msg.js'
import './DB/SubUncheck.js'
import './DB/Revenue.js'
import './DB/Month.js'
import './DB/PlanSold.js'
import './DB/Waiting.js'
import './DB/Refund.js'
import './DB/Help.js'

import resolvers from './logic/resolver.js'

const context = ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
        const { userId } = jwt.verify(authorization, SECRATE)
        return { userId }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !== "production" ?
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageDisabled()
    ]
});

if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
    })
}
await server.start();

server.applyMiddleware({
    app,
    path: '/graphql'
});

httpServer.listen({ port, host: '0.0.0.0' }, () => {
    console.log(`🚀  Server ready at ${port} ${server.graphqlPath}`);
})