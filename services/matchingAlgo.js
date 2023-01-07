function refineCandidates(candidates, experience, budget) {
    let refinedCandidates = [];
    budget = JSON.parse(budget);
    experience = JSON.parse(experience)
    candidates.map(c => {
        let avgSal = (parseInt(c.budget.min) + parseInt(c.budget.max)) / 2;
        if(avgSal >= budget.min && avgSal <= budget.max) {
            if(parseInt(c.experience.year)>=experience.min-1 && parseInt(c.experience.year)<=experience.max+1) {
                refinedCandidates.push(c);
            }
            
        }
    })

    return refinedCandidates;
}

module.exports = { refineCandidates }