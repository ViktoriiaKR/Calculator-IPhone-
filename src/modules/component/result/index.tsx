import React, { Component } from 'react';
import './style.scss';

interface IProps {
    result: string
}

export class ResultPanel extends Component<IProps> {
    render() {
        const { result } = this.props
        return (
                <div className={'result-panel'}>
                    <input value={result} disabled/>
                </div>
        )
    }
}