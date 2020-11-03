class player
{
    constructor(name)
    {
        this.totalScore = -500
        this.turnScore = 0
        this.name = name
        this.activeDice = new Array(6)
        this.savedDice = []
        this.turnCount = 0
        this.farkle = false

        for(let i=0;i<6;i++)
        {
            this.activeDice[i] = new die()
        }
    }

    playerRoll()
    {
        this.savedDice = []
        let emptyDiceCheck = true
        for(let i=0;i<6;i++)
        {
            if(this.activeDice[i] != 0) emptyDiceCheck = false
        }
        

        if(!emptyDiceCheck) this.activeDice.map( (die) => {if (die != 0) die.roll() } )
        else
        {
            this.savedDice = []
            this.activeDice = new Array(6)
            for(let i=0;i<6;i++)
            {
                this.activeDice[i] = new die()
            }
        }
    }

    diceToNums()
    {
        let nums = []
        for(let i=0;i<this.savedDice.length;i++)
        {
            nums.push(this.savedDice[i].value)
        }
        return nums
    }

    moveDice(key)//takes in int value from 1-6
    {
        key = key - 1
        if(this.activeDice[key] != 0)//move from active to saved
        {
            this.savedDice.push(this.activeDice[key])
            this.activeDice[key] = 0
        }
        else//move from saved to active
        {
            if(this.savedDice.length > 0) 
            {
                this.activeDice[key] = this.savedDice[this.savedDice.length - 1]
                this.savedDice.splice(this.savedDice.length - 1, 1)
            }
        }
    }

    endTurn()
    {
        this.tally(this.diceToNums())
        this.activeDice = new Array(6)
        this.savedDice = []

        for(let i=0;i<6;i++)
        {
            let die_i = new die()
            this.activeDice[i] = die_i
        }
        console.log("turn score is ",this.turnScore," at endTurn", this.farkle)
        if(!this.farkle) this.totalScore += this.turnScore
        this.turnCount++
        this.turnScore = 0
        this.farkle = false
    }

    tally(d)
    {
        let diceCount = d.length
        let score = 0
        if(diceCount == 0)
        {
            this.farkle=true
        }
        else if(diceCount == 1)
        {
//SINGLE 1
            if(d[0] == 1) score += 100
//SINGLE 5
            else if(d[0] == 5) score += 50
            else this.farkle = true
        }
        else if(diceCount == 2)
        {//Split array into pieces and tally pieces
            this.tally(d.slice(0,1))
            this.tally(d.slice(1))
        }
        else if(diceCount == 3)
        {
            d.sort((a,b) => {return a-b})
//3 OF A KIND
            if(d[0] == d[2])
            {
                if(d[0] == 1) score += 300
                else score+= d[0]*100
            }
            else
            {//Split array into pieces and tally pieces
                this.tally(d.slice(0,1))//first element
                this.tally(d.slice(1))//last two elements get handled together
            }
        }
        else if(diceCount == 4)
        {
            d.sort((a,b) => {return a-b})
//4 OF A KIND
            if(d[0] == d[3]) score+=1000
            else if(d[1] == d[2])//three of a kind is present
            {
                if(d[0] == d[1])
                {
                    this.tally(d.slice(0,3))//first 3 dice are 3ok
                    this.tally(d.slice(3))
                }
                else
                {
                    this.tally(d.slice(1,4))//last 3 dice are 3ok
                    this.tally(d.slice(0,1))
                }
            }
            else
            {
                this.tally(d.slice(0,2))//first two
                this.tally(d.slice(2))//last two
            }
        }
        else if(diceCount == 5)
        {
            d.sort((a,b) => {return a-b})
//5 OF A KIND
            if(d[0] == d[4]) score += 2000
            else if(d[0] == d[3] || d[1] == d[4])//4ok is present
            {
                if(d[0] == d[3])
                {
                    this.tally(d.slice(0,4))//first 4 dice
                    this.tally(d.slice(4))//last 1 dice
                }
                else
                {
                    this.tally(d.slice(0,1))//first 1 dice
                    this.tally(d.slice(1))//last 4 dice
                }
            }
            else//3ok is present
            {
                if(d[0] != d[2])//the 3ok is located in the last 4 dice
                {
                    this.tally(d.slice(0,1))//first dice
                    this.tally(d.slice(1))//last 4 dice
                }
                else//the 3ok is located in the first 4 dice
                {
                    this.tally(d.slice(0,4))
                    this.tally(d.slice(4))
                }
            }
            
        }
        else if(diceCount == 6)
        {
            d.sort((a,b) => {return a-b})
//6 OF A KIND
            if(helper_uniqueValues(d) == 1) score += 3000
            else if(helper_uniqueValues(d) == 6) score += 1500//straight
            else if(helper_uniqueValues(d) == 2)
            {
                if(d[2] != d[3]) score += 2500//two triplets
                else if(d[0] == d[1] && d[4] == d[6]) score += 1500//4ok and a pair
                else if(d[0] == d[3])//first value is part of a 4ok/5ok
                {
                    this.tally(d.slice(0,5))//first 5 dice
                    this.tally(d.slice(5))//last 1 die
                }
                else
                {
                    this.tally(d.slice(1))//last 5 dice
                    this.tally(d.slice(0,1))//first 1 die
                }
            }
            else if(helper_uniqueValues(d) == 3)
            {
                if(d[0] == d[1] && d[2] == d[3] && d[4] == d[5]) score += 1500//three pair
                else if(d[0] == d[2])//first value is part of a 3ok/4ok
                {
                    this.tally(d.slice(0,5))//first 5 dice
                    this.tally(d.slice(5))//last 1 die
                }
                else
                {
                    this.tally(d.slice(1))//last 5 dice
                    this.tally(d.slice(0,1))//first 1 die
                }
            }
            else this.farkle = true
        }
        this.turnScore += score
    }

    softTally(d)
    {
        let diceCount = d.length
        let score = 0
        if(diceCount == 1)
        {
//SINGLE 1
            if(d[0] == 1) score += 100
//SINGLE 5
            else if(d[0] == 5) score += 50
        }
        else if(diceCount == 2)
        {//Split array into pieces and tally pieces
            score += this.softTally(d.slice(0,1))
            score += this.softTally(d.slice(1))
        }
        else if(diceCount == 3)
        {
            d.sort((a,b) => {return a-b})
//3 OF A KIND
            if(d[0] == d[2])
            {
                if(d[0] == 1) score += 300
                else score+= d[0]*100
            }
            else
            {//Split array into pieces and tally pieces
                score += this.softTally(d.slice(0,1))//first element
                score += this.softTally(d.slice(1))//last two elements get handled together
            }
        }
        else if(diceCount == 4)
        {
            d.sort((a,b) => {return a-b})
//4 OF A KIND
            if(d[0] == d[3]) score+=1000
            else if(d[1] == d[2])//three of a kind is present
            {
                if(d[0] == d[1])
                {
                    score += this.softTally(d.slice(0,3))//first 3 dice are 3ok
                    score += this.softTally(d.slice(3))
                }
                else
                {
                    score += this.softTally(d.slice(1,4))//last 3 dice are 3ok
                    score += this.softTally(d.slice(0,1))
                }
            }
            else
            {
                score += this.softTally(d.slice(0,2))//first two
                score += this.softTally(d.slice(2))//last two
            }
        }
        else if(diceCount == 5)
        {
            d.sort((a,b) => {return a-b})
//5 OF A KIND
            if(d[0] == d[4]) score += 2000
            else if(d[0] == d[3] || d[1] == d[4])//4ok is present
            {
                if(d[0] == d[3])
                {
                    score += this.softTally(d.slice(0,4))//first 4 dice
                    score += this.softTally(d.slice(4))//last 1 dice
                }
                else
                {
                    score += this.softTally(d.slice(0,1))//first 1 dice
                    score += this.softTally(d.slice(1))//last 4 dice
                }
            }
            else//3ok is present
            {
                if(d[0] != d[2])//the 3ok is located in the last 4 dice
                {
                    score += this.softTally(d.slice(0,1))//first dice
                    score += this.softTally(d.slice(1))//last 4 dice
                }
                else//the 3ok is located in the first 4 dice
                {
                    score += this.softTally(d.slice(0,4))
                    score += this.softTally(d.slice(4))
                }
            }
            
        }
        else if(diceCount == 6)
        {
            d.sort((a,b) => {return a-b})
//6 OF A KIND
            if(helper_uniqueValues(d) == 1) score += 3000
            else if(helper_uniqueValues(d) == 6) score += 1500//straight
            else if(helper_uniqueValues(d) == 2)
            {
                if(d[2] != d[3]) score += 2500//two triplets
                else if(d[0] == d[1] && d[4] == d[6]) score += 1500//4ok and a pair
                else if(d[0] == d[3])//first value is part of a 4ok/5ok
                {
                    score += this.softTally(d.slice(0,5))//first 5 dice
                    score += this.softTally(d.slice(5))//last 1 die
                }
                else
                {
                    score += this.softTally(d.slice(1))//last 5 dice
                    score += this.softTally(d.slice(0,1))//first 1 die
                }
            }
            else if(helper_uniqueValues(d) == 3)
            {
                if(d[0] == d[1] && d[2] == d[3] && d[4] == d[5]) score += 1500//three pair
                else if(d[0] == d[2])//first value is part of a 3ok/4ok
                {
                    score += this.softTally(d.slice(0,5))//first 5 dice
                    score += this.softTally(d.slice(5))//last 1 die
                }
                else
                {
                    score += this.softTally(d.slice(1))//last 5 dice
                    score += this.softTally(d.slice(0,1))//first 1 die
                }
            }
        }
        return score
    }
}