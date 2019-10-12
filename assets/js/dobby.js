/*
    Dobby Google API Wrapper

    This is a wrapper for Google API created and used in Dobby Co., Ltd.
    All the documents need to be published as web in public.

    Written by Juan Lee (juanlee@kaist.ac.kr)
    version: dobby.dev.0.1
*/

/**************************************************/
// Sheet

const readSheet = async sheetId => {
  let sheet = 1;
  sheets = {};

  try {
    // retrieve all sheets until not exist
    while (true) {
      const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/${sheet}/public/values?alt=json`;
      const data = await $.getJSON(url, data => {
        return data;
      });

      sheets[data.feed.title.$t] = data.feed.entry.map(entry => {
        const colnames = Object.keys(entry)
          .filter(col => col.startsWith("gsx"))
          .map(col => col.slice(4));

        let parsed = {};
        colnames.forEach(col => {
          parsed[col] = entry["gsx$" + col].$t;
        });
        return parsed;
      });

      sheet += 1;
    }
  } catch (error) {}

  return sheets;
};
