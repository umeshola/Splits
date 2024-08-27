import mongoose, { Query } from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const SECRETE = process.env.SECRATE;

const User = mongoose.model("User")
const SubWaiting = mongoose.model("SubWaiting")
const Sub = mongoose.model("Sub")
const Msg = mongoose.model("Msg")
const SubUncheck = mongoose.model('SubUncheck')
const Revenue = mongoose.model("Revenue")
const Month = mongoose.model("Month")
const PlanSold = mongoose.model("PlanSold")
const Waiting = mongoose.model("Waiting")
const Refund = mongoose.model("Refund")
const Help = mongoose.model("Help")

const resolvers = {
    Query: {
        me: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const user = await User.findById(userId);
            return user;
        },
        giveOnePlan: async(_, { id }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const sub = await Sub.findById(id);
            if (!sub) {
                throw new Error(`Subscription with ID ${id} not found.`);
            }
            const startingDate = new Date(sub.starting);
            const endingDate = new Date(startingDate);
            endingDate.setMonth(startingDate.getMonth() + sub.timePeriod);
            const members = await Promise.all(
                sub.members.map(async(memberId) => {
                    const user = await User.findById(memberId);
                    return {
                        id: user._id,
                        userName: user.userName,
                    };
                })
            );
            return {
                id: sub._id,
                plan: sub.plan,
                platform: sub.platform,
                starting: sub.starting,
                ending: endingDate.toISOString(),
                price: sub.price,
                email: sub.email,
                password: sub.password,
                members,
            };
        },
        giveplan: async(_, args, { userId }) => {
            if (!userId) {
                throw new Error("User not authenticated");
            }
            const subscriptions = await Sub.find({ members: userId })

            const plans = await Promise.all(
                subscriptions.map(async(sub) => {
                    const startingDate = new Date(sub.starting);
                    const endingDate = new Date(startingDate);
                    endingDate.setMonth(startingDate.getMonth() + sub.timePeriod);

                    const members = await Promise.all(
                        sub.members.map(async(memberId) => {
                            const user = await User.findById(memberId);
                            return {
                                id: user._id,
                                userName: user.userName,
                            };
                        })
                    );

                    return {
                        id: sub._id,
                        plan: sub.plan,
                        platform: sub.platform,
                        starting: sub.starting,
                        ending: endingDate.toISOString(),
                        price: sub.price,
                        email: sub.email,
                        password: sub.password,
                        members,
                    };
                })
            );

            return plans;
        },
        giveallplan: async(_, args, { userId }) => {
            const subscriptions = await Sub.find().sort({ starting: -1 });
            const plans = await Promise.all(
                subscriptions.map(async(sub) => {
                    const startingDate = new Date(sub.starting);
                    const endingDate = new Date(startingDate);
                    endingDate.setMonth(startingDate.getMonth() + sub.timePeriod);
                    const members = await Promise.all(
                        sub.members.map(async(memberId) => {
                            const user = await User.findById(memberId);
                            return {
                                id: user._id,
                                userName: user.userName,
                            };
                        })
                    );
                    return {
                        id: sub._id,
                        plan: sub.plan,
                        platform: sub.platform,
                        starting: sub.starting,
                        ending: endingDate.toISOString(),
                        price: sub.price,
                        email: sub.email,
                        password: sub.password,
                        members,
                    };
                })
            );

            return plans;
        },
        oneplan: async(_, { id }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const sub = await Sub.findById(id);
            if (!sub) throw new Error("Subscription not found");
            const members = await Promise.all(
                sub.members.map(async(memberId) => {
                    const user = await User.findById(memberId);
                    return {
                        id: user._id,
                        userName: user.userName,
                    };
                })
            );

            return [{
                left: sub.starting,
                plan: sub.plan,
                platform: sub.platform,
                price: sub.price,
                Ldevice: sub.Ldevice,
                Ddevice: sub.Ddevice,
                email: sub.email,
                password: sub.password,
                timePeriod: sub.timePeriod,
                quality: sub.quality,
                members,
            }, ];
        },
        get_unCheck: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const subUnchecks = await SubUncheck.find();
            const result = await Promise.all(
                subUnchecks.map(async(subUncheck) => {
                    const user = await User.findById(subUncheck.by);
                    if (!user) throw new Error('User not found');

                    return {
                        id: subUncheck._id,
                        userName: user.userName,
                        email: user.email,
                        members: subUncheck.member,
                        plan: subUncheck.plan,
                        platform: subUncheck.platform,
                        price: subUncheck.price,
                        timePeriod: subUncheck.timePeriod,
                    };
                })
            );
            return result;
        },
        get_waiting: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const waitingEntries = await Waiting.find({ by: userId });
                return waitingEntries;
            } catch (error) {
                throw new Error("Failed to fetch waiting entries: " + error.message);
            }
        },
        get_msg: async(_, { id }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");

            const subscription = await Sub.findById(id);
            const memberIds = subscription.members.map(memberId => memberId.toString());

            const messages = await Msg.find({
                on: id, // Check if the message's 'on' field matches the given 'id'
                $or: [
                    { by: userId, to: { $in: memberIds } },
                    { by: { $in: memberIds }, to: userId }
                ]
            }).populate('by', 'userName'); // Populate the 'by' field to get the userName

            const formattedMessages = messages.map(message => ({
                msg: message.msg,
                side: message.by._id.equals(userId),
                userName: message.by.userName
            }));

            return { messages: formattedMessages };
        },
        get_totalR: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const revenue = await Revenue.findOne();
                if (revenue) {
                    return revenue.totalR;
                } else {
                    return null;
                }
            } catch (error) {
                throw error;
            }
        },
        get_sold_plan: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const soldPlans = await PlanSold.find();
                const result = soldPlans.map(plan => ({
                    plan: plan.plan,
                    platform: plan.platform,
                    count: plan.count,
                    members: plan.members,
                }));

                return result;
            } catch (error) {
                throw new Error(`Error fetching sold plans: ${error.message}`);
            }
        },
        get_month: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");

            const currentDate = new Date();
            const months = [];

            for (let i = 0; i < 4; i++) {
                const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);

                const monthRecord = await Month.findOne({
                    month: {
                        $gte: monthStart,
                        $lt: monthEnd
                    }
                });

                months.push({
                    month: monthStart.toLocaleString('default', { month: 'long' }),
                    revenue: monthRecord ? monthRecord.totalR : 0
                });
            }

            return months.reverse();
        },
        get_help: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");

            const helpEntries = await Help.find().populate('by').populate('complain');

            return helpEntries.map(entry => ({
                id: entry._id.toString(),
                by: entry.by,
                on: entry.complain,
                time: entry.timeRN.toISOString()
            }));
        },
        get_refund: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const refunds = await Refund.find({});
                const populatedRefunds = await Promise.all(
                    refunds.map(async(refund) => {
                        const user = await User.findById(refund.by);
                        return {
                            id: refund._id.toString(), // Map _id to id
                            by: user ? [user] : [],
                            plan: refund.plan,
                            platform: refund.platform,
                        };
                    })
                );
                return populatedRefunds;
            } catch (error) {
                throw new Error("Error fetching refund data: " + error.message);
            }
        }
    },
    Mutation: {
        signup: async(_, { userNew }) => {
            const { email, password, userName, firstName, lastName, phone } = userNew;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("Your account alread been created, Please login!");
            } else {
                const newUser = new User({...userNew });
                await newUser.save();
                const token = jwt.sign({ userId: newUser._id }, SECRETE);
                return { token };
            }
        },
        login: async(_, { userOld }) => {
            const { userName, password } = userOld;
            const existingUser = await User.findOne({ userName });
            if (existingUser) {
                if (existingUser.password !== password) {
                    throw new Error("UserName or password is incorrect");
                }
                const token = jwt.sign({ userId: existingUser._id }, SECRETE);
                return { token };
            } else {
                throw new Error("Create account first")
            }
        },
        helped: async(_, { id }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            await Help.findByIdAndDelete(id)
            return "Checked"
        },
        refunded: async(_, { id }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            await Refund.findByIdAndDelete(id)
            return "Done refunding!"
        },
        remove_waiting: async(_, args, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                // Define the 7 days in milliseconds
                const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
                const currentTime = new Date().getTime();
                // Find all Waiting entries that exceed the 7-day limit
                const waitingEntries = await Waiting.find({});
                for (let entry of waitingEntries) {
                    const startTime = new Date(entry.timeRN).getTime();
                    const timePassed = currentTime - startTime;
                    if (timePassed > sevenDaysInMillis) {
                        const newRefund = new Refund({
                            plan: entry.plan,
                            platform: entry.platform,
                            member: entry.member,
                            by: entry.by,
                        });
                        await newRefund.save();
                        await Waiting.findByIdAndDelete(entry._id);
                    }
                }

                return "Expired waiting entries removed and moved to refund.";
            } catch (error) {
                throw new Error("Error removing waiting entries: " + error.message);
            }
        },
        buyplan: async(_, { buyplanNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { plan, member, platform, price, quality, Ldevice, Ddevice, timePeriod } = buyplanNew;
            const existingSub = await Sub.findOne({
                plan,
                platform,
                members: userId
            });
            if (existingSub) {
                throw new Error(`You are already subscribed to the ${plan} plan on ${platform}.`);
            }
            const BuyPlan = new SubUncheck({
                plan,
                member,
                by: userId,
                platform,
                timePeriod,
                Ldevice,
                Ddevice,
                quality,
                price,
            });
            await BuyPlan.save();
            const newWaiting = new Waiting({
                plan,
                member,
                platform,
                by: userId,
                timePeriod,
                timeRN: new Date(),
                price
            })
            await newWaiting.save();
            const revenue = await Revenue.findOne();
            if (revenue) {
                revenue.totalR += price;
                await revenue.save();
            } else {
                const newRevenue = new Revenue({ totalR: price });
                await newRevenue.save();
            }
            const now = new Date();
            const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const monthEntry = await Month.findOne({ month: currentMonth });

            if (monthEntry) {
                monthEntry.totalR += price;
                await monthEntry.save();
            } else {
                const newMonthEntry = new Month({
                    totalR: price,
                    month: currentMonth
                });
                await newMonthEntry.save();
            }

            return "Successfully added to the waiting list";
        },
        help: async(_, { complain }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const existingHelp = await Help.findOne({ by: userId, complain });

            if (existingHelp) {
                throw new Error("You have already submitted this complaint.");
            }

            const newHelp = new Help({
                by: userId,
                complain,
                timeRN: new Date()
            });

            await newHelp.save();
            return "Help is coming";
        },
        notPaid: async(_, { id }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            await SubUncheck.findByIdAndDelete(id)
            return "Done removing from queue"
        },
        checked: async(_, { id }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const findPlans = await SubUncheck.findById(id);
            if (!findPlans) throw new Error("No such plan found in SubUncheck.");

            const { plan, platform, member } = findPlans;
            const existingSub = await Sub.findOne({ plan, platform, members: id });
            if (existingSub) {
                throw new Error(`You are already subscribed to the ${plan} plan on ${platform}.`);
            }
            const findSubWaitings = await SubWaiting.find({ plan, platform, member });

            if (findSubWaitings.length + 1 === member) {
                const memberIds = findSubWaitings.map((waiting) => waiting.by);
                memberIds.push(findPlans.by);

                const NewSub = new Sub({
                    plan,
                    platform,
                    members: memberIds,
                    starting: new Date(),
                    timePeriod: findPlans.timePeriod,
                    Ldevice: findPlans.Ldevice,
                    Ddevice: findPlans.Ddevice,
                    quality: findPlans.quality,
                    price: findPlans.price,
                    email: "empty",
                    password: "empty",
                });

                await NewSub.save();
                const planSoldEntry = await PlanSold.findOne({ plan, platform, members: member });
                if (planSoldEntry) {
                    planSoldEntry.count += 1;
                    await planSoldEntry.save();
                } else {
                    const newPlanSold = new PlanSold({
                        count: 1,
                        plan,
                        platform,
                        members: member
                    });
                    await newPlanSold.save();
                }
                const updateUserSubs = async(userId, subId) => {
                    await User.findByIdAndUpdate(userId, { $addToSet: { sub: subId } }, { new: true });
                };
                for (const memberId of memberIds) {
                    await updateUserSubs(memberId, NewSub._id);
                }
                await SubUncheck.findByIdAndDelete(id)
                await Waiting.deleteMany({ plan, platform, member });
                await SubWaiting.deleteMany({ plan, platform, member });
                return `You have been added to a group of ${member} for the ${platform} subscription.`;
            } else {
                const NewSubWaiting = new SubWaiting({
                    by: findPlans.by,
                    plan,
                    platform,
                    timePeriod: findPlans.timePeriod,
                    Ldevice: findPlans.Ldevice,
                    Ddevice: findPlans.Ddevice,
                    quality: findPlans.quality,
                    price: findPlans.price,
                    member: findPlans.member,
                });
                await NewSubWaiting.save();
                await SubUncheck.findByIdAndDelete(id)
                return "Successfully added to the waiting list.";
            }
        },
        sendmsg: async(_, { MsgNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { id, msg } = MsgNew;
            const subscription = await Sub.findById(id);
            const to = subscription.members.filter(memberId => memberId.toString() !== userId);
            if (to.length === 0) throw new Error("Message must have at least one recipient other than yourself.");
            const newMsg = new Msg({
                by: userId,
                to,
                msg,
                on: id
            });
            await newMsg.save();
            return "Message sent successfully!";
        },
        mail_pass: async(_, { mail_passNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { id, email, password } = mail_passNew;
            const updatedSub = await Sub.findByIdAndUpdate(id, { email, password }, { new: true });
            if (!updatedSub) { throw new Error("Plan not found or update failed!"); }
            return "email and the password is updated";
        },
        cancle: async(_, { cancle_new }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { plan, platform, member, price } = cancle_new;
            const subUncheckEntry = await SubUncheck.findOneAndDelete({
                plan,
                platform,
                member,
                by: userId
            });
            if (subUncheckEntry) {
                const WaitingEntry = await Waiting.findOneAndDelete({
                    plan,
                    platform,
                    member,
                    by: userId
                });
                const newRefund = new Refund({
                    plan,
                    platform,
                    member,
                    by: userId
                })
                await newRefund.save()
                return "deleted from subWaiting";
            }
            const subWaitingEntry = await SubWaiting.findOneAndDelete({
                plan,
                platform,
                member,
                by: userId
            });
            if (subWaitingEntry) {
                const WaitingEntry = await Waiting.findOneAndDelete({
                    plan,
                    platform,
                    member,
                    by: userId

                });
                const newRefund = new Refund({
                    plan,
                    platform,
                    member,
                    by: userId
                })
                await newRefund.save()
                return "deleted from subWaiting";
            }
            return {
                message: "No matching entry found to delete.",
                success: false
            };

        }
    }
};

export default resolvers;