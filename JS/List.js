export class List
{
    constructor(ClassType)
    {
        this.array = new Array()
        this.classType=ClassType;
    }
    //Appends the specified element to the end of this list (optional operation).
    add(element)
    {
        if(element instanceof this.classType) this.array.push(element); else throw new Error("Cannot add element because that element class is not within collection class");

    }
    //Inserts the specified element at the specified position in this list (optional operation).
    addAtIndex(index,element)
    {
        if(!(element instanceof this.classType))  throw new Error("Cannot add element because that element class is not within collection class");
        this.array.splice(index,0,element);
    }
    // Iterates for each element in list
    forEach(functio)
    {
        for (this.i=0; this.i<this.array.length;this.i++)
        {
       functio(this.array[this.i]);      
        }
    }
    //Removes the first occurrence of the specified element from this list, if it is present (optional operation).
    delete(element)
    {
        for(var i=0; i<this.array.length;i++)
        {
            if(this.array[i]==element)
            {
                this.array.splice(i,1);
            return;
            }
        }
    }
    //Returns true if this list contains the specified element.
    contains(element)
    {
        for(var i=0; i<this.array.length;i++)
        {
            if(this.array[i]==element)
            {
            return true;
            }
        }
        return false;
    }  
    // Removes object at index
    remove(index)
    {
        this.array.splice(index,1); 
    }
    //Returns an array containing all of the elements in this list in proper sequence (from first to last element).
    toArray()
    {
        return new Array(this.array);
    }
    //Returns the element at the specified position in this list.
    get(index)
    {
        return this.array[index];
    }
    clone()
    {
        var temp = new List(this.classType)
        temp.array = this.array;
        return temp;
    }

}