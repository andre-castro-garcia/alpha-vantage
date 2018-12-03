import React from 'react';
import { Search } from './components/search';
import { Quote } from './components/quote';

const App = (() =>
    <div>
        <table cellPadding={25}>
            <tbody>
                <tr>
                    <td valign="top" style={{width:"600px"}}>
                        <Search />
                    </td>
                    <td valign="top" style={{width:"600px"}}>
                        <Quote />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>);
export default App;
