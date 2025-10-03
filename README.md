# Hi-res Image View For OLX

**Open OLX's images as hi-res ones**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

[Extension currently avaliable for `Firefox` only, sorry](https://addons.mozilla.org/uk/firefox/addon/olx_hi-res_iv/)

---

# Why
Because I spend a lot of time on OLX, searching the HDDs at reasonable price, I regularly open the images to look up for details, like if drive was tampered with, or if it have some other issues - a lot of things that need the "zooming" on image, that... wasn't avaliable when image was small.

Because of optimizations and... **a lot of other reasons** (like bandwidth optmization), OLX limits the resolution, and due to how backend and frontend works - OLX front page uses resolution value in link that **didn't correspond to the image's native one**, and server converts it on demand. It's like if you have one original image with 1920x1080 resolution and on-demand code that converts the image to other format with, let's say, 1366x768 when link provide that info. So OLX do that exactly.

So, opening images in new tab and set the image resolution to 10000 by 7000 resolve all the problems that I listed, and this is why I created `OLX hi-res IV`


# Possible issues?
Idk if OLX Group would allow that thing to exists because... it can create higher bandwidth usage, **but it is on demand**, not always, so... It's more like user experience improvement than problems for OLX because of higher server loads, bandwidth and etc. etc. Force page reload with cleared cache will be worse than loading image in original quality I think

If for some reason, OLX group will like to talk to me - I leaved my mail on [extention page](https://addons.mozilla.org/uk/firefox/addon/olx_hi-res_iv/) in the "email support"

# Extention support
Currently I can't provide the info that "this extention will work on **any** version of Firefox", or "Will work on every OLX page" - extention testings is in progress

`Would I like to install VM and manually test extention on every version of Firefox?` Maybe...? It'll be time consuming, but it will worth to do that surely. (If someone are unemployed or have a lot of free time and want to spend time to something that will help to small amount of people - please, test extention on various Firefox versions and even maybe systems, it will reduce amount of work, also, check DEVLOG.MD for infos)

`Would I add this extention to Chrome Extention Store?` Later - yes, now - no. Extention lacks some "smoothing" in functions, like  I think it was possible to make on Manifest V3, but I wasn't done it then and made for Manifest V2, and Chrome doesn't support it now because of... you know why - Youtube. So, currently Firefox is my support for this mini project


# Support me
Currently I don't have international way to support me that will surely work because I currently can't do some things right, so...

You can support me via [monobank jar page](https://send.monobank.ua/jar/9PHgXye4Mc) or by jar credentials (literally jar that acts like card but for savings): 4441 1111 2973 0218

or my full credentials: 

```
Реквізити для поповнення банки «На кавусю авторові»

Отримувач: Ночевний Арсеній Миколайович
IBAN: UA933220010000026202353751326
ІПН/ЄДРПОУ: 3996904115
Призначення платежу: Поповнення рахунку банки
```

(translation:)
```
Details for jar replenishment "On coffee for author"

Recipient: Nochevnyi Arsenii
IBAN: UA933220010000026202353751326
TIN/EDRPOU: 3996904115
Purpose of payment: Jar account replenishment
```

Idk if monobank and US/EU banks will allow to use those variants of credentials, anyway - I find my IBAN but idk much about how to use the Western Union and... Who will do WU anyway?
