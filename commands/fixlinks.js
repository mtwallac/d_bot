module.exports = {
  name: '.fl',
  description: '(universal permission) Attempts to fixes links that do not display information',
  execute(msg, args) {
    // msg.channel.send(`Fixing garbo links`);
  },
  async improve(msg) {
    if (msg.author.id === '767922830989197382') {return}

    const regex = /https?:\/\/(?=(?:....)?amazon|smile)(www|smile)\S+com(((?:\/(?:dp|gp)\/([A-Z0-9]+))?\S*[?&]?(?:tag=))?\S*?)(?:#)?(\w*?-\w{2})?(\S*)(#?\S*)+/
    const axios = require('axios')
    const axiosRetry = require('axios-retry')
    console.log(msg.content, regex.test(msg.content))
    if (regex.test(msg.content)) {
      axiosRetry(axios, {
        retries: 3,
        retryDelay: (retryCount) => {
          console.log(`retry attempt: ${retryCount}`)
          return retryCount * 2000
        },
        retryCondition: (error) => {
          return error.response.status === 503
        }
      })
      const res = await axios({
        method: 'GET',
        url: `${msg.content}`
      }).catch((err) => {
        if (err.response.status !== 200) {
          msg.channel.send(`Amazon hates you`)
          throw new Error(`API call failed with status code: ${err.response.status} after 3 retry attempts`)
        }
      })
      try {
        let data = res.data
        if (data.includes(`id="productTitle"`)) {
          let span_index_start = data.indexOf(`id="productTitle"`)
          let span_index_end = span_index_start + data.substring(span_index_start).indexOf(`</span>`)
          let productName = data.substring(span_index_start, span_index_end)
          productName = productName.replace(/(\r\n|\n|\r)/gm,"")
          productName = productName.replace('&ndash;', '-')
          productName = productName.substring(productName.indexOf('>')+1)
          msg.channel.send(`${productName}`);
        }
        if (data.includes(`id="imgTagWrapperId"`)) {
          let img_index_start = data.indexOf(`id="imgTagWrapperId"`)
          let img_index_end = img_index_start + data.substring(img_index_start).indexOf(`</div>`)
          let imgString = data.substring(img_index_start, img_index_end)
          let imgSrc_start = imgString.indexOf('https://images')
          let imgSrc = imgString.substring(imgSrc_start, imgString.indexOf('"', imgSrc_start) < imgString.indexOf('&quot;', imgSrc_start) ? imgString.indexOf('"', imgSrc_start) : imgString.indexOf('&quot;', imgSrc_start))
          console.log(imgSrc)
          msg.channel.send({
            files: [`${imgSrc}`]
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
};

