<template>
    <div class="chatbox" id="app">
        <div class="colorPanel"
            :style="{ display: colorPanelShown ? 'flex' : 'none', opacity: colorPanelShown ? 'flex' : 'none' }">
            <div class="colorPanel__colorSlot" v-for="color in colors" :key="color">
                <div class="colorPanel__color" :style="{ background: color }" @click="setColor(color)"></div>
            </div>
        </div>
        <div class="chatbox__header">
            <div class="chatbox__headerText">HHV Technology
                <div class="chatbox__onlineDot"></div>
            </div>
            <div class="chatbox__button" @click="colorPanelShown = !colorPanelShown"></div>
        </div>
        <div class="chatbox__messages">
            <div class="chatbox__messageBox" v-for="message in messages" :key="message.id"
                :class="{ 'chatbox__messageBox--primary': message.primary }">
                <div class="chatbox__message" :class="{ 'chatbox__message--primary': message.primary }"
                    :style="{ background: message.primary ? chatColor : '#f1f1f1' }">
                    {{ message.text }}
                </div>
            </div>
        </div>
        <div class="chatbox__inputPanel">
            <input class="chatbox__input" v-model="newMessage" @keyup.enter="send" placeholder="Aa" />
            <div class="chatbox__tooltip chatbox__tooltip--bottom"
                :style="{ opacity: newMessage.length > 2 && !tutorialSeen ? 0.7 : 0 }">
                Press enter to send the message
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            chatColor: '#0084ff',
            colorPanelShown: false,
            newMessage: '',
            tutorialSeen: false,
            colors: [
                '#0084ff', '#ffc300', '#4af844',
                '#7646ff', '#a695c7', '#ff5ca1',
                '#fa3c4c', '#f56b78', '#33343f'
            ],
            messages: []
        };
    },
    methods: {
        send() {
            axios.post('http://127.0.0.1:8000/api/send', { message: this.newMessage })
                .then(response => {
                    this.messages.push({ id: lastId + 1, text: response?.data, primary: false });

                })
                .catch(error => {
                    console.error(error);
                });
                let lastId = this.messages[this.messages.length - 1]?.id || 1;
            this.messages.push({ id: lastId + 1, text: this.newMessage, primary: true });
            this.tutorialSeen = true;
            this.newMessage = '';
        },
        setColor(color) {
            this.chatColor = color;
            this.colorPanelShown = false;
        }
    }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
body {
  margin: 0;
  font-family: 'Roboto';
}
.visible {
  opacity: 1;
}
.colorPanel {
  position: absolute;
  margin: 70px auto;
  left: 0;
  right: 0;
  height: 200px;
  width: 200px;
  z-index: 3;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 30px #aaa;
  transition: all 0.12s;
}
.colorPanel__colorSlot {
  box-sizing: border-box;
  width: 33%;
  height: 33%;
  padding: 10px;
}
.colorPanel__color {
  height: 100%;
  width: 100%;
  border-radius: 100px;
  cursor: pointer;
  background: #eee;
  transition-duration: 0.12s;
}
.colorPanel__color:hover {
  opacity: 0.7;
}
.chatbox {
  display: block;
  position: relative;
  max-width: 400px;
  margin: 20px auto;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 30px #eee;
  font-size: 17px;
}
.chatbox__header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  font-weight: 900;
  padding: 10px 0;
  width: 100%;
  text-align: center;
  cursor: default;
  justify-content: space-between;
  border-bottom: 2px solid #f5f5f5;
}
.chatbox__headerText {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
}
.chatbox__onlineDot {
  display: block;
  background: #00c853;
  height: 10px;
  width: 10px;
  border-radius: 10px;
  margin-left: 5px;
  animation-name: blinking;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}
.chatbox__tooltip {
  opacity: 0;
  z-index: 2;
  width: auto;
  font-size: 12px;
  text-align: center;
  padding: 3px 10px;
  cursor: default;
  position: absolute;
  color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  background: #111;
  transition: all 0.14s;
}
.chatbox__tooltip--bottom {
  top: 115%;
  margin-left: 110px;
  opacity: 0.2;
}
.chatbox__tooltip--left {
  right: calc(100% + 5px);
  right: -moz-calc(100% + 5px);
  margin-left: 5px;
  top: 5px;
}
.chatbox__messages {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.chatbox__messageBox {
  width: 100%;
  margin-top: 5px;
  position: relative;
}
.chatbox__messageBox--primary {
  text-align: right;
}
.chatbox__message {
  position: relative;
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: default;
  background: #f1f1f1;
  transition: all 0.12s;
}
.chatbox__message:hover {
  opacity: 0.7;
}
.chatbox__message:hover .chatbox__tooltip {
  opacity: 1;
}
.chatbox__message--primary {
  color: #fff;
}
.chatbox__inputPanel {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chatbox__input {
  font-family: 'Roboto';
  font-size: 1em;
  width: 100%;
  border: none;
  background: #f3f3f3;
  margin: 0 10px;
  padding: 5px 15px;
  color: #444;
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  height: 40px
}
.chatbox__button {
  display: inline-block;
  height: 20px;
  width: 22px;
  color: #fff;
  border-radius: 10px;
  background: #0084ff;
  cursor: pointer;
  font-weight: 900;
  transition-duration: 0.1s;
}
.chatbox__button:hover {
  opacity: 0.7;
}
@-moz-keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
@media screen and (max-width: 450px) {
  .chatbox {
    box-sizing: border-box;
    margin: 0;
    max-width: 100%;
    width: 100%;
    border-radius: 0;
    height: 100%;
  }
}

</style>
