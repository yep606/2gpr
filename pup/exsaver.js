import xlsx from 'xlsx'

export async function saveToWorksheet(array){
    var newWB = xlsx.utils.book_new();
    var newWS = xlsx.utils.json_to_sheet(array);
    xlsx.utils.book_append_sheet(newWB, newWS, 'Test Data');
    xlsx.writeFile(newWB, "Testing.xlsx");

}