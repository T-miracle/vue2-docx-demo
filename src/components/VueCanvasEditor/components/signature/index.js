import { EditorComponent, EDITOR_COMPONENT } from '@hufe921/canvas-editor'
import './index.css'

export class Signature {
    constructor(options) {
        this.MAX_RECORD_COUNT = 1000
        this.DEFAULT_WIDTH = 390
        this.DEFAULT_HEIGHT = 180
        this.undoStack = []
        this.x = 0
        this.y = 0
        this.isDrawing = false
        this.isDrawn = false
        this.linePoints = []
        this.options = options
        this.preTimeStamp = 0
        this.dpr = window.devicePixelRatio
        this.canvasWidth = (options.width || this.DEFAULT_WIDTH) * this.dpr
        this.canvasHeight = (options.height || this.DEFAULT_HEIGHT) * this.dpr

        const { mask, container, trashContainer, undoContainer, canvas } =
            this._render()
        this.mask = mask
        this.container = container
        this.trashContainer = trashContainer
        this.undoContainer = undoContainer
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.scale(this.dpr, this.dpr)
        this.ctx.lineCap = 'round'
        this._bindEvent()
        this._clearUndoFn()

        // 禁止背景滚动
        document.documentElement.classList.add('overflow-hidden')
        document.body.classList.add('overflow-hidden')
        this.container.classList.add('overflow-hidden')
    }

    _render() {
        const { onClose, onCancel, onConfirm } = this.options

        // 遮罩层
        const mask = document.createElement('div')
        mask.classList.add('signature-mask')
        mask.setAttribute(EDITOR_COMPONENT, EditorComponent.COMPONENT)
        document.body.append(mask)

        // 容器
        const container = document.createElement('div')
        container.classList.add('signature-container')
        container.setAttribute(EDITOR_COMPONENT, EditorComponent.COMPONENT)

        // 弹窗
        const signatureContainer = document.createElement('div')
        signatureContainer.classList.add('signature')
        container.append(signatureContainer)

        // 标题
        const titleContainer = document.createElement('div')
        titleContainer.classList.add('signature-title')
        const titleSpan = document.createElement('span')
        titleSpan.append(document.createTextNode('插入签名'))
        const titleClose = document.createElement('i')
        titleClose.onclick = () => {
            if (onClose) onClose()
            this._dispose()
        }
        titleContainer.append(titleSpan)
        titleContainer.append(titleClose)
        signatureContainer.append(titleContainer)

        // 操作区
        const operationContainer = document.createElement('div')
        operationContainer.classList.add('signature-operation')

        // 撤销
        const undoContainer = document.createElement('div')
        undoContainer.classList.add('signature-operation__undo')
        const undoIcon = document.createElement('i')
        const undoLabel = document.createElement('span')
        undoLabel.innerText = '撤销'
        undoContainer.append(undoIcon)
        undoContainer.append(undoLabel)
        operationContainer.append(undoContainer)

        // 清空
        const trashContainer = document.createElement('div')
        trashContainer.classList.add('signature-operation__trash')
        const trashIcon = document.createElement('i')
        const trashLabel = document.createElement('span')
        trashLabel.innerText = '清空'
        trashContainer.append(trashIcon)
        trashContainer.append(trashLabel)
        operationContainer.append(trashContainer)

        signatureContainer.append(operationContainer)

        // 画布
        const canvasContainer = document.createElement('div')
        canvasContainer.classList.add('signature-canvas')
        const canvas = document.createElement('canvas')
        canvas.width = this.canvasWidth
        canvas.height = this.canvasHeight
        canvas.style.width = `${this.canvasWidth / this.dpr}px`
        canvas.style.height = `${this.canvasHeight / this.dpr}px`
        canvasContainer.append(canvas)
        signatureContainer.append(canvasContainer)

        // 按钮
        const menuContainer = document.createElement('div')
        menuContainer.classList.add('signature-menu')

        const cancelBtn = document.createElement('button')
        cancelBtn.classList.add('signature-menu__cancel')
        cancelBtn.append(document.createTextNode('取消'))
        cancelBtn.type = 'button'
        cancelBtn.onclick = () => {
            if (onCancel) onCancel()
            this._dispose()
        }
        menuContainer.append(cancelBtn)

        const confirmBtn = document.createElement('button')
        confirmBtn.append(document.createTextNode('确定'))
        confirmBtn.type = 'submit'
        confirmBtn.onclick = () => {
            if (onConfirm) onConfirm(this._toData())
            this._dispose()
        }
        menuContainer.append(confirmBtn)

        signatureContainer.append(menuContainer)

        // 渲染
        document.body.append(container)

        return { mask, canvas, container, trashContainer, undoContainer }
    }

    _bindEvent() {
        this.trashContainer.onclick = this._clearCanvas.bind(this)
        this.undoContainer.onclick = this._undo.bind(this)
        this.canvas.onmousedown = this._startDraw.bind(this)
        this.canvas.onmousemove = this._draw.bind(this)
        this.container.onmouseup = this._stopDraw.bind(this)
        this.container.ontouchmove = this.registerTouchmove.bind(this)
        this.container.ontouchstart = this.registerTouchstart.bind(this)
        this.container.ontouchend = this.registerTouchend.bind(this)
    }

    _undo() {
        if (this.undoStack.length > 1) {
            this.undoStack.pop()
            if (this.undoStack.length) {
                this.undoStack[this.undoStack.length - 1]()
            }
        }
    }

    _saveUndoFn(fn) {
        this.undoStack.push(fn)
        while (this.undoStack.length > this.MAX_RECORD_COUNT) {
            this.undoStack.shift()
        }
    }

    _clearUndoFn() {
        const clearFn = () => {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        }
        this.undoStack = [clearFn]
    }

    _clearCanvas() {
        this._clearUndoFn()
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    _startDraw(evt) {
        this.isDrawing = true
        this.x = evt.offsetX
        this.y = evt.offsetY
        this.ctx.lineWidth = 1
    }

    _draw(evt) {
        if (!this.isDrawing) return
        const curTimestamp = performance.now()
        const distance = Math.sqrt(evt.movementX ** 2 + evt.movementY ** 2)
        const speed = distance / (curTimestamp - this.preTimeStamp)
        const SPEED_FACTOR = 3
        const targetLineWidth = Math.min(5, Math.max(1, 5 - speed * SPEED_FACTOR))
        const SMOOTH_FACTOR = 0.2
        this.ctx.lineWidth =
            this.ctx.lineWidth * (1 - SMOOTH_FACTOR) + targetLineWidth * SMOOTH_FACTOR

        const { offsetX, offsetY } = evt
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(offsetX, offsetY)
        this.ctx.stroke()
        this.x = offsetX
        this.y = offsetY
        this.linePoints.push([offsetX, offsetY])
        this.isDrawn = true
        this.preTimeStamp = curTimestamp
    }

    _stopDraw() {
        this.isDrawing = false
        if (this.isDrawn) {
            const imageData = this.ctx.getImageData(
                0,
                0,
                this.canvasWidth,
                this.canvasHeight
            )
            const self = this
            this._saveUndoFn(function () {
                self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight)
                self.ctx.putImageData(imageData, 0, 0)
            })
            this.isDrawn = false
        }
    }

    _toData() {
        if (!this.linePoints.length) return null

        let [minX, minY] = this.linePoints[0]
        let [maxX, maxY] = this.linePoints[0]

        for (let i = 0; i < this.linePoints.length; i++) {
            const [px, py] = this.linePoints[i]
            if (px < minX) minX = px
            if (px > maxX) maxX = px
            if (py < minY) minY = py
            if (py > maxY) maxY = py
        }

        const lineWidth = this.ctx.lineWidth
        minX = minX < lineWidth ? 0 : minX - lineWidth
        minY = minY < lineWidth ? 0 : minY - lineWidth
        maxX = maxX + lineWidth
        maxY = maxY + lineWidth

        const sw = maxX - minX
        const sh = maxY - minY

        const imageData = this.ctx.getImageData(
            minX * this.dpr,
            minY * this.dpr,
            sw * this.dpr,
            sh * this.dpr
        )

        const canvas = document.createElement('canvas')
        canvas.style.width = `${sw}px`
        canvas.style.height = `${sh}px`
        canvas.width = sw * this.dpr
        canvas.height = sh * this.dpr
        const ctx = canvas.getContext('2d')
        ctx.putImageData(imageData, 0, 0)
        const value = canvas.toDataURL()

        return { value, width: sw, height: sh }
    }

    registerTouchmove(evt) {
        this.registerTouchEvent(evt, 'mousemove')
    }

    registerTouchstart(evt) {
        this.registerTouchEvent(evt, 'mousedown')
    }

    registerTouchend() {
        const me = new MouseEvent('mouseup', {})
        this.canvas.dispatchEvent(me)
    }

    registerTouchEvent(evt, eventName) {
        const touch = evt.touches[0]
        const me = new MouseEvent(eventName, {
            clientX: touch.clientX,
            clientY: touch.clientY
        })
        this.canvas.dispatchEvent(me)
    }

    _dispose() {
        this.mask.remove()
        this.container.remove()
        document.documentElement.classList.remove('overflow-hidden')
        document.body.classList.remove('overflow-hidden')
    }
}
