import React from 'react';

const companies = (props) => {
    const { companies } = props;
    const companiesResult = companies.map((company, i) => (<li key={i}>{company}</li>));

    return (
        <div>
            <ul>{companiesResult}</ul>
        </div>
    );
};

export default companies;