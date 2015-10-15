# gitlab-webhook-receiver
[![](https://badge.imagelayers.io/wyvernnot/gitlab-webhook-receiver:latest.svg)](https://imagelayers.io/?images=wyvernnot/gitlab-webhook-receiver:latest 'Get your own badge on imagelayers.io') [![](https://img.shields.io/npm/v/gitlab-webhook-receiver.svg)](https://www.npmjs.com/package/gitlab-webhook-receiver)

Out of the box webhook receiver for gitlab and show webhook activities using browser notifications.

[![](https://nodei.co/npm/gitlab-webhook-receiver.png)](https://www.npmjs.com/package/gitlab-webhook-receiver)

**Screenshot**

![Sceenshot](https://github.com/wyvernnot/gitlab-webhook-receiver/blob/master/doc/screenshot.png)

### Step 1 Start the server using docker or npm

**Docker**

`sudo docker run -p 3001:3001 wyvernnot/gitlab-webhook-receiver`

**NPM**

`npm start`, or you can specify custom port like this `PORT=3001 npm start`

### Step 2 Register the webhook server in gitlab project settings

### Step 3 Put the following script into any website you want to receive notifications

```html
<script type="text/javascript" src="http://HOST:PORT/"></script>
```

