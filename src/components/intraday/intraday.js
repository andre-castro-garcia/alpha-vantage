import React from 'react';

import { bool, any } from 'prop-types';
import { compose } from 'recompose';

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const convertTimeSeriesDataset = (raw) => {
    let data = [];
    let rawRootData = raw["Time Series (5min)"];

    let array = Object.keys(rawRootData).map(key => { return [key, rawRootData[key]] });

    for (let i = array.length; i > 0; i--) {
        let date = new Date(array[i-1][0]);
        let previousDate = new Date().setHours(0, 0, 0, 1000);

        if (date < previousDate)
            continue;

        data.push({
            name: array[i-1][0],
            val: array[i-1][1]["4. close"]
        });
    }

    return data;
};

const enhance = compose();
const Intraday = enhance(({ intraday, variation }) =>
    <div>
        <div>
            <h6>Timezone: {intraday["Meta Data"]["6. Time Zone"]}</h6>
            <LineChart width={600} height={200} data={convertTimeSeriesDataset(intraday)}>
                <XAxis dataKey="name" hide={true} type="category" domain={['dataMin', 'dataMax']} />
                <YAxis type="number" hide={true} domain={['dataMin', 'dataMax']} />
                <CartesianGrid strokeDasharray="4 4"/>]
                <Tooltip/>
                <Line type="monotone" dataKey="val" stroke={variation ? "#0d8960" : "#e71e1e"}/>
            </LineChart>
        </div>
    </div>
);

Intraday.propTypes = {
    variation: bool.isRequired,
    intraday: any.isRequired
};

export default Intraday;
