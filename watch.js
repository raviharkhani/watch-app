if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      return window.setTimeout(function () {
        callback(Date.now());
      }, 1000 / 60);
    };
  }
  
  const map = function (val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
  export default {
    vuetify: new Vuetify(),
    mounted() {
      this.startDrawing()
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
    data() {
      return {
        interval: null,
        time: new Date(),
        hourMarkers: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        textRadius: 38.4,
        colorPickers: [
          {title: "Text", name: "textColor"},
          {title: "Accent", name: "accentColor"},
          {title: "Inner Dial", name: "dialColor"},
          {title: "Outer Dial", name: "ringColor"},
          {title: "Hands", name: "handsColor"},
          {title: "Case", name: "caseColor"}
        ],
        settings: {
          textColor: "white",
          accentColor: "#6CC417",
          dialColor: "black",
          ringColor: "black",
          handsColor: "white",
          caseColor: "rgb(40,40,40)",
          logoText: "EPOCH & CO.",
          subTitle: "Automatic"
        }
      };
    },
    methods: {
      startDrawing() {
        this.time = new Date()
        window.requestAnimationFrame(this.startDrawing)
      }
    },
    computed: {
      month() {
        let monthNames = [
          "January", 
          "February", 
          "March", 
          "April", 
          "May", 
          "June",
          "July", 
          "August", 
          "September", 
          "October", 
          "November", 
          "December"
        ];
        return monthNames[this.time.getMonth()].slice(0,3).toUpperCase()
      },
      day() {
        return this.time.getDate()
      },
      hourTransform() {
        const rotation = (this.time.getHours() % 12) * 30 + this.time.getMinutes() /2
        return `rotate(${rotation})`
      },
      minuteTransform() {
         return `rotate(${this.time.getMinutes()*6})`
      },
      secondTransform() {
        const mill = this.time.getMilliseconds() / 1000
        return `rotate(${(this.time.getSeconds() + mill)*6})`
      },
      hours() {
        const len = this.hourMarkers.length
        const slice = (Math.PI * 2) / len
        const r = this.textRadius
        return this.hourMarkers.map((hr, index) => {
          const lg = index % 3 === 0;
          const fontSize = lg? 6:4;
          const offSet = 0;
          const x = Math.sin(slice * index) * (r + offSet)
          const y = Math.cos(slice * index  + Math.PI) * (r + offSet)
          return {
            x, y, no: hr, lg, fontSize
          }
        })
      },
      secondMarkers() {
        return [...Array(60).keys()].map(index => {
          const s = Math.sin((Math.PI * 2 / 60) * index)
          const c = Math.cos((Math.PI * 2 / 60) * index)
          const lg = index % 5 === 0
          const outerR = 32
          const innerR = lg? 29.5: 31
          return {
            x1: s * outerR,
            x2: s * innerR,
            y1: c * outerR,
            y2: c * innerR
          }
        })
      }
    }
  };