var dayjs = require("dayjs");

function sortDates(dates) {
    dates.sort((date1, date2) => {
        date1 = date1.time;
        date2 = date2.time;
        date1 = date1.split('-'), date2 = date2.split('-');
        let day1 = parseInt(date1[2]);
        let day2 = parseInt(date2[2]);
        let month1 = parseInt(date1[1]);
        let month2 = parseInt(date2[1]);
        let year1 = parseInt(date1[0]);
        let year2 = parseInt(date2[0]);
        if (year1 !== year2) {
            return year1 - year2;
        } else if (month1 !== month2) {
            return month1 - month2;
        } else {
            return day1 - day2;
        }
    });
    return dates;
}

function durationCalculator(t) {
    let year,
        month,
        day,
        hour,
        minute,
        second;
  
    second = Math.floor(t / 1000);
    minute = Math.floor(second / 60);
    second = second % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    month = Math.floor(day / 30);
    day = day % 30;
    year = Math.floor(month / 12);
    month = month % 12;
  
    return { year, month, day, hour, minute, second };
}

function addExperience(t1,t2) {
    t1.year = t1.year + t2.year;
    t1.month = t1.month + t2.month;
    t1.day = t1.day + t2.day;
    return t1;
}

function processExperienceData(experiences) {
    var data = [];
    experiences.map(exp => {
        if(!exp.isCurrent) {
            var obj = {
                time:  dayjs(exp.startDate).format('YYYY-MM-DD'),
                isEnd: false
            };
            data.push(obj);
            obj = {
                time:  dayjs(exp.endDate).format('YYYY-MM-DD'),
                isEnd: true
            };
            data.push(obj);
        } else {
            var obj = {
                time: dayjs(exp.startDate).format('YYYY-MM-DD'),
                isEnd: false
            };
            data.push(obj);
            obj = {
                time: dayjs(exp.endDate).format('YYYY-MM-DD'),
                isEnd: true
            };
            data.push(obj);
        }
    });
    return data;
}

function calculateExperience(experiences) {
    var x = processExperienceData(experiences);
    var dates = [
        {
            time: '2022-11-30',
            isEnd: true
        },
        {
            time: '2022-08-30',
            isEnd: false
        },{
            time: '2022-02-22',
            isEnd: false
        },
        {
            time: '2021-06-30',
            isEnd: false
        },
        {
            time: '2022-04-30',
            isEnd: true
        },
        {
            time: '2022-06-30',
            isEnd: true
        },
        {
            time: '2023-11-30',
            isEnd: false
        },
    ];
    dates = sortDates(x);
    var total = { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0 };
    var startDate = -1;
    var endDate = -1;
    for(var i=0;i<dates.length;i++) {
        if(!dates[i].isEnd && startDate === -1) {
            startDate = dayjs(dates[i].time);
        } else if(i<dates.length-1 && dates[i].isEnd && !dates[i+1].isEnd) {
            endDate = dayjs(dates[i].time);
            total = addExperience(total,durationCalculator(endDate.diff(startDate)));
            startDate = -1;
            endDate = -1;
        } else if(i===dates.length-1 && dates[i].isEnd) {
            endDate = dayjs(dates[i].time);
            total = addExperience(total,durationCalculator(endDate.diff(startDate)));
        }
    }
    return total;
}


function processSkillData(oldSkillList, newSkillsData) {
    const { skillList, duration, typeOfProject } = newSkillsData;
    let res = [];
    if(oldSkillList.length === 0) {
        skillList.map( o => {
            const obj  = {
                skillName: o,
                types: [
                    {
                        typeName: typeOfProject,
                        duration: duration,
                    }
                ],
                score: calculateSkillCompenency([{
                        typeName: typeOfProject,
                        duration: duration
                    }])
            }
            res.push(obj);
        })
    } else {
        res = oldSkillList;
        skillList.map( newSkill => {
            let foundSkill = false;
            res.map(oldSkill => {
                if(oldSkill.skillName == newSkill) {
                    foundSkill = true;
                    let foundType=false;
                    oldSkill.types.map( type => {
                        if(type.typeName === typeOfProject) {
                            foundType=true;
                            for (const key in type.duration) {
                                if (type.duration.hasOwnProperty(key)) {
                                  type.duration[key] = type.duration[key] + duration[key]
                                }
                            }
                        }
                    });
                    if(!foundType) {
                        oldSkill.types.push({
                            typeName: typeOfProject,
                            duration: duration,
                        })
                    }
                    oldSkill.score = calculateSkillCompenency(oldSkill.types);
                }
            })
            if(!foundSkill) {
                let obj = {
                    skillName: newSkill,
                    types: [
                        {
                            typeName: typeOfProject,
                            duration: duration,
                        }
                    ],
                    score: calculateSkillCompenency([
                        {
                            typeName: typeOfProject,
                            duration: duration,
                        }
                    ])
                }
                res.push(obj);
            }
        })
    }
    return res;
}

function calculateSkillCompenency(types) {
    let total = 0;
    types.map(type => {
        let yr = type.duration.year;
        let mn = type.duration.month;
        let dy = type.duration.day;
        let score = (yr*365) + (mn*30) + dy;
        let attention = 0;
        if(type.typeName === 'industry') {
            attention = 7.5; //7.5
        } else if(type.typeName === 'intern') {
            attention = 6.3; //6.3
        } else if(type.typeName === 'self') {
            attention = 3.4; //3.4
        }
        score = attention*score;
        total = total + score; //15000
    })
    return total/150;
}

function calculateIndustryCompentency(type, duration) {
    let total = 0;
    let yr = duration.year;
    let mn = duration.month;
    let dy = duration.day;
    let score = (yr*365) + (mn*30) + dy;
    let attention = 5;
    if(type === 'fullTime') {
        attention = 7.5; //7.5
    }
    score = attention*score;
    total = total + score; //15000
    return total/150;
}

module.exports = { processSkillData, calculateExperience, calculateIndustryCompentency }