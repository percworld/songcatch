const formatDate = inputDate => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let date = new Date(inputDate);
    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

module.exports = formatDate;