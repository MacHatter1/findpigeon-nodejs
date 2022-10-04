var request = require("request");
var argv = require("minimist")(process.argv.slice(2));

var data = {
  jsonrpc: "2.0",
  id: "3",
};
console.log(argv);
let loft = argv["l"];
if (!loft) {
  throw new Error("loft id is required");
}
let pigeon = argv["p"];
if (!pigeon) {
  throw new Error("Pigeon number is required");
}
var season = argv["s"];
if (!season) {
  var season = 4;
  console.log("season not provided using season 4");
}
var url =
  "https://www.oneloftrace.live/meta/get.php?the=3.3&loft_id=" +
  loft +
  "&season_id=" +
  season +
  "&sEcho=2&iColumns=4&sColumns=&iDisplayStart=0&iDisplayLength=500&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&sSearch=&bRegex=false&sSearch_0=&bRegex_0=false&bSearchable_0=true&sSearch_1=&bRegex_1=false&bSearchable_1=true&sSearch_2=&bRegex_2=false&bSearchable_2=true&sSearch_3=&bRegex_3=false&bSearchable_3=true&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=true&_=1664907393162";
request.post({ url: url }, function (err, httpResponse, body) {
  if (err) {
    return console.error("post failed:", err);
  }
  var data = JSON.parse(body);

  console.log("Searching for: " + pigeon);

  for (i in data["aaData"]) {
    var re = new RegExp(/fancier_id=([^&]+)/gm);
    var r = data["aaData"][i][0].match(re);
    var match = re.exec(data["aaData"][i][0]);
    var url2 =
      "https://www.oneloftrace.live/meta/get.php?the=5.1&loft_id=" +
      loft +
      "&fancier_id=" +
      match[1] +
      "&season_id=" +
      season +
      "&sEcho=1&iColumns=14&sColumns=&iDisplayStart=0&iDisplayLength=10&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&mDataProp_10=10&mDataProp_11=11&mDataProp_12=12&mDataProp_13=13&sSearch=&bRegex=false&sSearch_0=&bRegex_0=false&bSearchable_0=true&sSearch_1=&bRegex_1=false&bSearchable_1=true&sSearch_2=&bRegex_2=false&bSearchable_2=true&sSearch_3=&bRegex_3=false&bSearchable_3=true&sSearch_4=&bRegex_4=false&bSearchable_4=true&sSearch_5=&bRegex_5=false&bSearchable_5=true&sSearch_6=&bRegex_6=false&bSearchable_6=true&sSearch_7=&bRegex_7=false&bSearchable_7=true&sSearch_8=&bRegex_8=false&bSearchable_8=true&sSearch_9=&bRegex_9=false&bSearchable_9=true&sSearch_10=&bRegex_10=false&bSearchable_10=true&sSearch_11=&bRegex_11=false&bSearchable_11=true&sSearch_12=&bRegex_12=false&bSearchable_12=true&sSearch_13=&bRegex_13=false&bSearchable_13=true&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=true&bSortable_4=true&bSortable_5=true&bSortable_6=true&bSortable_7=true&bSortable_8=true&bSortable_9=true&bSortable_10=true&bSortable_11=true&bSortable_12=true&bSortable_13=true&_=1664908647315";
    request.post({ url: url2 }, function (err, httpResponse, body2) {
      if (err) {
        return console.error("post failed:", err);
      }
      var data2 = JSON.parse(body2);
      for (ii in data2["aaData"]) {
        if (data2["aaData"][ii][0].includes(pigeon)) {
          console.log("Pigeon Found.");
          console.log(data2["aaData"][ii][0]);
          found++;
          break;
        }
      }
    });
  }
});
