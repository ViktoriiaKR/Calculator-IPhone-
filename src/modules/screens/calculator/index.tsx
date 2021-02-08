import React, { Component } from 'react';
import { ResultPanel } from './../../component/result/index';
import { ToolBar } from './../../component/toolbar/index'
import './style.scss';

export default class CalculatorPrototype extends Component{
	constructor(props: string) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

 	state = {
		firstValue: '',
		operator: '',
		secondValue: '',
		result: '0',
		memory: 0,
		forMemoryOperand: false
	}
	
	handleClick = (value: string) => {
	// for basic operands js
		const operators = ['/','*','+','-'];
		let lastResult = this.state.result;
		let check = operators.some((operator) => {
			let checkResult = (operator === value);
				return checkResult;
		});
		if (value !== '=' && value !== '.') {
			if (check) {
				if (this.state.operator !== '' && this.state.secondValue !== '') {
					this.findResult()
				}
				this.setState({ operator: value });
			} else if (this.state.operator === '') {
				this.setState({ 
					firstValue: this.state.result === '0' ? String(value) : lastResult + value,
					result: this.state.result === '0' ? String(value) : lastResult + value,
			 })
			} else {
				if (this.state.secondValue.length === 0) {
					this.setState({ 
						result: value,
						secondValue: value
					});
				} else {
					this.setState({ 
						result: lastResult + value,
						secondValue: lastResult + value,
					})
				}
			};
		}	
	// for other operands
		if (value === "=" && this.state.firstValue !== '' && this.state.operator !== '' && this.state.secondValue !== '') {
			this.findResult()
		};

		switch(value) {
			case 'AC':
				this.clearValue();
				break;
			case '%':
				this.percent(value);
				break;
			case '+/-':
				this.negativeValue();
				break;
			case '.':
				this.dot();
				break;
			case 'mr':
				this.onMemoryRecallButtonClick();
				break;
			case 'mc':
				this.onMemoryClearButtonClick();
				break;
			case 'm+':
				this.onMemoryPlusButtonClick();
				break;
			case 'm-':
				this.onMemoryMinusButtonClick();
				break;
		};
	};
	
	negativeValue() {
		const { firstValue } = this.state
		const { secondValue } = this.state
		if (secondValue) {
			const newResult = Number(secondValue) * -1
			this.setState({
				result: newResult,
				secondValue: newResult
			});
		} else {
			const newResult = Number(firstValue) * -1
			this.setState({
				result: newResult,
				firstValue: newResult
			});
		};
	};
	
	percent(val: string) {
		const { result } = this.state
		const currentValue = parseFloat(result)
		if (this.state.operator === '+' || this.state.operator === '-') {
			this.setState({
				firstValue: this.state.result === '0' ? String(val) : currentValue
			})
			const res = parseFloat(this.state.firstValue) / 100 * currentValue
			this.setState({
				firstValue: this.state.firstValue,
				result: res,
				secondValue: res 
			})
		} else {
			const forOthers = currentValue / 100;
			this.setState({
				firstValue: this.state.firstValue,
				result: forOthers,
				secondValue: forOthers 
			})
		};
	};

	dot() {
		const { result } = this.state
		if (!(/\./).test(result)) {
			this.setState({
				result: result + '.',
			});
		};
	};

	// "MR" - when there is a number in memory, the "mr" button is highlighted
	onMemoryRecallButtonClick = () => { 
		this.setState({
			memory: parseFloat(this.state.result),
			result: '0',
			forMemoryOperand: true
		});
	};

	// "M+" - to add to the value in memory (adds the number on the display to the number already in the memory
	onMemoryPlusButtonClick = () => {
		this.setState({
			result: this.state.memory + parseFloat(this.state.result),
			memory: this.state.memory + parseFloat(this.state.result)
		});
	};
	
	// "M-" to subtract a value from memory (subtracts a number on the display from a number in memory)
	 onMemoryMinusButtonClick = () => {
		this.setState({
			result: this.state.memory - parseFloat(this.state.result),
			memory: this.state.memory - parseFloat(this.state.result)
		});
	};

	// "MC" - to clear the memory, i.e. set the value to 0
	onMemoryClearButtonClick = () => { 
		this.setState({
			memory: 0,
			result: '0',
			forMemoryOperand: false
		});
	};

	clearValue() {
		this.setState({ 
			firstValue: '',
			operator: '',
			secondValue: '',
			result: '0'
		});
	};

	findResult = () => {
		const checkValue = this.state.firstValue + this.state.operator + this.state.secondValue;
		this.setState({ 
			operator: '',
			secondValue: '',
		});
		let sum = eval(checkValue).toString();
		this.setState({ 
			result: sum,
			firstValue: sum
		});
	};
	
	render() {
		const { result } = this.state
		const signDel = result !== '0'
		const clearResult = signDel || this.state.forMemoryOperand ? 'C' : 'AC'

		return (
				<div className='calculator'>
					<ResultPanel
						result={this.state.result}
					/>
					<ToolBar
						handleClick={this.handleClick}
						specialSignDel={clearResult}
						hasMemory={this.state.forMemoryOperand}
					/>
				</div>
		)
	}
}