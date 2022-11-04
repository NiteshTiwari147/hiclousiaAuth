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
            attention = 0.7;
        } else if(type.typeName === 'intern') {
            attention = 0.5;
        } else if(type.typeName === 'self') {
            attention = 0.4;
        }
        score = attention*score;
        total = total + score;
    })
    return total;
}

module.exports = { processSkillData }