// Check for overlapping dates
const isOverlapping = (newStart: Date, newEnd: Date, otherStart: Date, otherEnd: Date): boolean => {
  return  newStart < otherEnd && newEnd > otherStart
};

// Check for valid dates
const validateDate = (date: string): Date | null => {
    const newDate = new Date(date);
    if(isNaN(newDate.getTime())) {
        return null;
    }
    return newDate;
};

export { isOverlapping, validateDate };

