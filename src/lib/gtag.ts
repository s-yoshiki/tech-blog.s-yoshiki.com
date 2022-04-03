export const GA_ID = "G-PJBP94L671"

// IDが取得できない場合を想定する
export const existsGaId = true;

// PVを測定する
export const pageview = (path :any) => {
  window.gtag("config", GA_ID, {
    page_path: path,
  });
};

// GAイベントを発火させる
export const event = ({ action, category, label, value = "" }: any) => {
  if (!existsGaId) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value,
  });
};
