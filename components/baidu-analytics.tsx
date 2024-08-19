const BaiduAnalytics = () => {
  return (
    <script>
      {`var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?814cf9007574befd36723c7528f1190f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`}
    </script>
  );
};

export default BaiduAnalytics;
