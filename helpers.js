let helper_uniqueValues = function(arr)//works only for a sorted array
{
    let count = 1
    num = arr[0]
    for(let i=1;i<arr.length;i++)
    {
        if(num != arr[i])
        {
            count++
            num = arr[i]
        }
    }
    return count
}

let helper_dieFaceElement = function(i)
{
    let el = new Image()
    el.src = "dieFaces/die_" + i + ".png"
    return el
}