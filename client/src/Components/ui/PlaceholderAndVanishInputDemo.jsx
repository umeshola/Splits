import React, { useState } from 'react';
import { PlaceholdersAndVanishInput } from './placeholder-and-vanish-input';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_PLAN_INFO } from '../../connection/query';

export function PlaceholdersAndVanishInputDemo({ onPlanSelect }) {
    const [id, setId] = useState("");
    const { data: d1 } = useQuery(GET_SINGLE_PLAN_INFO, {
        variables: {
            data: id
        }
    });

    const placeholders = [
        "Find About the Subscription?",
        "What is the Subscription ID?",
        "When the plan is going to end?",
        "Update the password and email",
        "How to buy a plan?",
    ];

    const onSubmit = (e) => {
        e.preventDefault();
        if (d1) {
            onPlanSelect(d1.giveOnePlan); // Pass the selected plan to the parent component
        }
    };

    return (
        <div className="h-[35px] flex flex-col justify-center items-center px-4">
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => { setId(e.target.value) }}
                onSubmit={onSubmit}
            />
        </div>
    );
}