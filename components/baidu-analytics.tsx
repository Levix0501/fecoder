import Script from 'next/script';

const BaiduAnalytics = () => {
  return (
    process.env.NODE_ENV === 'production' && (
      <Script id="bdtj">
        {`var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?814cf9007574befd36723c7528f1190f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`}
      </Script>
    )
  );
};

export default BaiduAnalytics;
