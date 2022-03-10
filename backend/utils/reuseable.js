//__________getExperienceData from Number__________
// const getExperienceValue = () => {
// 	for (const data of experienceData) {
// 		if (data.value === info.experience) return data.title
// 	}
// }
export const getExperienceValue = (originalNumber, experienceData) => {
	for (const data of experienceData) {
		if (data.value === originalNumber) return data.title
	}
}
//__________getPreferWeek from weeks number__________
// const preferWeek = info.preferTime.map((obj) =>
// 	weeks.find((week) => week.data === obj.week)
// )
// const convertedWeek = preferWeek.map((obj, index) => ({
// 	...obj,
// 	time: info.preferTime[index].time,
// 	rank: info.preferTime[index].rank,
// }))
// const preferWeek = info.preferTime.map((obj) =>
// 	weeks.find((week) => week.data === obj.week)
// )
export const getPreferWeekValue = (originalArray, weeksData) =>
	originalArray
		.map((obj) => weeksData.find((week) => week.data === obj.week))
		.map((obj, index) => ({
			...obj,
			time: originalArray[index].time,
			rank: originalArray[index].rank,
		}))

//__________getConsoleType from data__________
export const getConsoleType = (originalString, consoleTypeData) =>
	consoleTypeData.filter((obj) => obj.data === originalString)[0].title
//__________getGameTitle from Games__________
export const getGameObject = (originalArray, gameData) =>
	originalArray.map((game) =>
		gameData.find((obj) => obj._id.toString() === game.toString())
	)
