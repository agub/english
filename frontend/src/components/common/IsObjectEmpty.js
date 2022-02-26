import React from 'react'

const IsObjectEmpty = (object) => {
	if (
		object &&
		Object.keys(object).length === 0 &&
		Object.getPrototypeOf(object) === Object.prototype
	) {
		return true
	} else {
		return false
	}
}

export default IsObjectEmpty
