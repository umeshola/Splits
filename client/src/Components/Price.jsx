import React, { useState, useEffect } from 'react';
import { Tabs } from './ui/Tabs';
import Netflix from './Helper/Netflix';
import Prime from './Helper/Prime';
import Disney from './Helper/Disney';
import Youtube from './Helper/Youtube';
import Spotify from './Helper/Spotify';
import Sony from './Helper/Sony';
export default function Price() {
    const tabs = [
        {
            title: "Netflix", value: "tab1", content:
                <div>
                    <Netflix />
                </div>
        },
        {
            title: "Prime", value: "tab2", content: <div>
                <Prime />
            </div>
        },
        {
            title: "Disney", value: "tab3", content: <div>
                <Disney />
            </div>
        },
        {
            title: "YouTube", value: "tab4", content: <div>
                <Youtube />
            </div>
        },
        {
            title: "Spotify", value: "tab5", content: <div>
                <Spotify />
            </div>
        },
        {
            title: "SonyLiv", value: "tab6", content: <div>
                <Sony />
            </div>
        },
    ];

    return (
        <div className='mb-[750px]'>
            <div className='md:mx-32'>
                <h1 className='text-[34px]'>
                    Choose plan
                </h1>
                <h1 className='text-[16px] text-neutral-300 mt-1'>
                    Clear pricing options tailored to meet your needs.
                </h1>
            </div>
            <Tabs tabs={tabs} />
        </div>
    );
}
