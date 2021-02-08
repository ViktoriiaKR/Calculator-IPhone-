import React from 'react';
import { OperOne, OperThree, OperFour, OperFive, OperSix } from './../../../const/tools';
import './style.scss';

interface IProps {
    handleClick?: (value: string) => void,
    value?: string,
    specialSignDel: string,
    hasMemory: boolean
}

export let ToolBar: React.FC<IProps> = (props: any) => {
    return (
        <div className={'toolbar'}>
            <div className={'toolbar-wrap-first'}>
                <div className={'small-wrap'}>
                    <button className={'btn '} onClick={() => props.handleClick('AC')}>{props.specialSignDel}</button>
                    {
                        OperOne.map((operator, i) => (
                            <button
                                key={i}
                                className={'btn '}
                                onClick={() => props.handleClick(operator)}
                            >
                                {operator}
                            </button>
                        ))
                    }
                </div>
                <div className={'small-wrap'}>
                        <button className={'btn special'} onClick={() => props.handleClick('mc')}>{'mc'}</button>
                        <button className={ props.hasMemory ? 'btn style-memory' : 'btn special'} onClick={() => props.handleClick('mr')}>{'mr'}</button>
                        <button className={'btn special'} onClick={() => props.handleClick('m-')}>{'m-'}</button>
                        <button className={'btn special'} onClick={() => props.handleClick('m+')}>{'m+'}</button>
                </div>
                <div className={'small-wrap'}>
                    {
                        OperThree.map((operator, i) => (

                            <button
                                key={i}
                                className={'btn numbers'}
                                onClick={() => props.handleClick(operator)}
                            >
                                {operator}
                            </button>
                        ))
                    }
                    <button className={'btn operators'} onClick={() => props.handleClick('*')}>{'x'}</button>
                </div>
                <div className={'small-wrap'}>
                    {
                        OperFour.map((operator, i) => (
                            <button
                                key={i}
                                className={'btn numbers'}
                                onClick={() => props.handleClick(operator)}
                            >
                                {operator}
                            </button>
                        ))
                    }
                </div>
                <div className={'small-wrap'}>
                    {
                        OperFive.map((operator, i) => (
                            <button
                                key={i}
                                className={'btn numbers'}
                                onClick={() => props.handleClick(operator)}
                            >
                                {operator}
                            </button>
                        ))
                    }
                </div>
                <div className={'small-wrap-last'}>
                    {
                        OperSix.map((operator, i) => (
                            <button
                                key={i}
                                className={'btn numbers-last'}
                                onClick={() => props.handleClick(operator)}
                            >
                                {operator}
                            </button>
                        ))
                    }
                </div>
             </div>
        </div>
    )
}