import React from 'react';

const companies = (props) => {
    const companiesResult = Object.keys(props.commonWords)
        .map((objKey, i) => {
            return (
                <tr key={i}>
                    <td>{++i}</td>
                    <td>{objKey}</td>
                    <td>{props.commonWords[objKey].count}</td>
                    <td>
                        <ul>
                            {
                                props.commonWords[objKey].companies.map(company => <li key={company}>{company}</li>)
                            }

                        </ul>
                    </td>
                </tr>
            )
        });
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Word</th>
                <th scope="col">Count</th>
                <th scope="col">Companies</th>
            </tr>
            </thead>
            <tbody>

            {companiesResult}

            </tbody>
        </table>
    );
};

export default companies;