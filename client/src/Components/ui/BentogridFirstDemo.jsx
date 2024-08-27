import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { GET_REVENUE, GET_REVENUE_MONTHLY, GET_SOLD_PLAN } from '../../connection/query';
import { useQuery } from '@apollo/client';
import { BentoGrid, BentoGridItem } from './Bentogrid';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const determineGoal = (totalR) => {
    if (totalR < 1000) return 1000;
    if (totalR < 10000) return 10000;
    if (totalR < 100000) return 100000;
    return Math.pow(10, Math.ceil(Math.log10(totalR + 1)));
};

const Hover = ({ data }) => {
    const totalR = data?.get_totalR || 0;
    const goal = determineGoal(totalR);

    const chartData = {
        datasets: [
            {
                data: [totalR, goal - totalR],
                backgroundColor: ['#4CAF50', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: '70%', // Doughnut-like effect
        maintainAspectRatio: false, // Disable the aspect ratio for more control
    };

    return (
        <div className="w-full h-full rounded-xl bg-neutral-800 bg-opacity-65 flex items-center justify-center relative">
            <div className="relative w-[170px] h-full">
                <Pie data={chartData} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl">
                    {"\u20B9"} {totalR}
                </div>
            </div>
            <div>
                <h1 className='text-2xl pl-2'>Goal {"\u20B9"}{goal}</h1>
            </div>
        </div>
    );
};


const Password = ({ data }) => {
    const months = data?.get_month.map(item => item.month) || [];
    const revenues = data?.get_month.map(item => item.revenue) || [];

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Revenue (₹)',
                data: revenues,
                backgroundColor: '#4CAF50',
            },
        ],
    };

    const maxRevenue = Math.max(...revenues);
    const stepSize = maxRevenue > 10000 ? 2000 : 1000;

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                stepSize: stepSize,
                ticks: {
                    callback: (value) => `₹${value}`
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="w-full h-full rounded-xl bg-neutral-800 bg-opacity-65 p-4">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

const Plan = ({ data }) => {
    const soldPlans = data?.get_sold_plan || [];

    return (
        <div className="w-full h-full rounded-xl bg-neutral-800 bg-opacity-65 p-4 overflow-x-auto">
            <div className="flex space-x-4 min-w-max">
                {soldPlans.map((plan, index) => (
                    <div key={index} className="flex-shrink-0 mt-12 mx-5 w-fit h-32 bg-neutral-800 p-4 rounded-xl flex flex-col justify-between">
                        <div className='flex'>
                            <div className="text-xl">{plan.plan}_</div>
                            <div className="text-xl font-semibold"> {plan.platform}</div>
                        </div>
                        <div className="text-sm">Sold: {plan.count}</div>
                        <div className="text-sm">Members: {plan.members}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default function BentogridFirstDemo() {
    const { data: d1 } = useQuery(GET_REVENUE);
    const { data: d2 } = useQuery(GET_REVENUE_MONTHLY);
    const { data: d3 } = useQuery(GET_SOLD_PLAN)

    const allItems = [
        {
            title: "Total Revenue",
            header: <Hover data={d1} />,
            className: "md:col-span-5",
        },
        {
            title: "Monthly Sell",
            header: <Password data={d2} />,
            className: "md:col-span-7",
        },
        {
            title: "Plans Sold",
            header: <Plan data={d3} />,
            className: "md:col-span-12",
        },
    ];

    return (
        <BentoGrid className="max-w-4xl mt-3 mx-auto md:auto-rows-[20rem]">
            {allItems.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    className={item.className}
                    icon={item.icon}
                />
            ))}
        </BentoGrid>
    );
}

