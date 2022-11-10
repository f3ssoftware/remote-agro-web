import { Card } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { useEffect, useState } from "react";
import { asyncFetchChart } from "../../../../stores/input.store";
import { pt, ptBR } from "date-fns/locale";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const initialData = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Fluxo de Caixa',
            data: labels.map((a, index) => 10 * index),
            borderColor: '#4C9626',
            backgroundColor: 'rgb(76 150 38 / 40%)',
        },
    ],
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: '',
        },
    },
};
export function Cashflow() {
    const { input } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    const [orderedPairs, setOrderedPairs]: any[] = useState([]);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        dispatch(asyncFetchChart());
    }, []);

    useEffect(() => {
        setOrderedPairs(input.chartOrderedPairs);
        setData({
            labels: orderedPairs.map((op: any) => new Date(op.date).toLocaleDateString('pt-BR')),
            datasets: [
                {
                    fill: true,
                    label: 'Fluxo de Caixa',
                    data: orderedPairs.map((op: any) => op.sum),
                    borderColor: '#4C9626',
                    backgroundColor: 'rgb(76 150 38 / 40%)',
                },
            ],
        });
    }, [input]);

    return <div>
        <Card className="ra-card">
            <Card.Body>
                <Card.Title>Fluxo de Caixa</Card.Title>
                <Line options={options} data={data} />
            </Card.Body>
        </Card>
    </div>
}