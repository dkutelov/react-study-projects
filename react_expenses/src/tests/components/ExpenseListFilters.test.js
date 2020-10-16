import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'

import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
	setTextFilter = jest.fn()
	sortByDate = jest.fn()
	sortByAmount = jest.fn()
	setStartDate = jest.fn()
	setEndDate = jest.fn()
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	)
})

test('Should render ExpenseListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('Should render ExpenseListFilters with alt data correctly', () => {
	wrapper.setProps({
		filters: altFilters
	})
	expect(wrapper).toMatchSnapshot()
})

test('Should render text input', () => {
	const value = altFilters.text
	wrapper.find('input').simulate('change', {
		target: { value }
	})
	expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text)
})

// Should sort by date
test('Should sort by Date', () => {
	wrapper.setProps({
		filters: altFilters
	})
	const value = 'date'
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByDate).toHaveBeenCalled()
})

test('Should sort by Amount', () => {
	const value = altFilters.sortBy
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByAmount).toHaveBeenCalled()
})

test('Should handle date changes', () => {
	const startDate = altFilters.startDate
	const endDate = altFilters.endDate
	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
		startDate,
		endDate
	})
	expect(setStartDate).toHaveBeenLastCalledWith(startDate)
	expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

// Should handle focused change
test('Should handle focused change', () => {
	const calendarFocused = 'endDate'
	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(
		calendarFocused
	)
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})
