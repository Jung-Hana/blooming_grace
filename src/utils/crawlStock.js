import { Cheerio, CheerioAPI, Element, load } from "cheerio";

export async getPageEncoding(headers: AxiosResponseHeaders) {
  if (headers["content-type"].toLowerCase().indexOf("euc-kr") !== -1) {
    return "euc-kr";
  }
  return "utf-8";
}

export async function getNaverTableTag(
  url: string,
  timeout = 3000
): Promise<{ $$: CheerioAPI, table: Cheerio<Element> }> {
  const content = await getDecodedPage(url, timeout);
  const $$ = load(content);
  const table = $$(".box_type_l > table").first();
  return { $$, table };
}

export function getTableTitles($$: CheerioAPI, table: Cheerio<Element>) {
  const titles: string[] = [];
  $$(table)
    .find("tr")
    .first()
    .find("th")
    .each((_, element) => {
      titles.push($$(element).text().trim());
    });
  return titles;
}

export function getTableStockInfo(
  $$: CheerioAPI,
  table: Cheerio<Element>
): string[][] {
  const titles = getTableTitles($$, table);
  const itemInfos: string[][] = [];
  let itemRowInfo: string[] = [];

  $$(table)
    .find("tr > .no")
    .each((_, element) => {
      const noElement = $$(element);
      noElement
        .parent()
        .find("td")
        .each((_, elem) => {
          itemRowInfo.push($$(elem).text().trim());
        });
      itemInfos.push(itemRowInfo);
      itemRowInfo = [];
    });

  itemInfos.unshift(titles);
  return itemInfos;
}

function checkDupTitleKey(titles: string[]) {
  return titles.reduce((newTitles: string[], title) => {
    if (newTitles.includes(title)) {
      newTitles.push(`${title}_1`);
    } else {
      newTitles.push(title);
    }
    return newTitles;
  }, []);
}

export function getTableStockInfoJson<T>(
  $$: CheerioAPI,
  table: Cheerio<Element>
): T[] {
  const titles = checkDupTitleKey(getTableTitles($$, table));
  const itemInfos: any[] = [];
  let itemRowInfo: { [x: string]: string } = {};
  $$(table)
    .find("tr > .no")
    .each((_, element) => {
      const noElement = $$(element);
      noElement
        .parent()
        .find("td")
        .each((index, elem) => {
          itemRowInfo[titles[index]] = $$(elem).text().trim();
        });
      itemInfos.push(itemRowInfo);
      itemRowInfo = {};
    });
  return itemInfos;
}
