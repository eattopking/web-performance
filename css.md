移动端适配

设备像素（也叫物理像素，就是具体的一个长度， 单位是pt， 我们的设计稿的长度就是设备像素， 这个长度是一个确定的真实的值）

css 像素（也叫逻辑像素， 就是我们写css的时候写的那个像素， 单位是px，css像素写了之后，也是一个确定的数， 就是这个数了）

dpr （设备像素比）=  设备像素/css像素 （任意一个方向上的），每个手机的设备像素比都是固定的， 设备像素比决定了，写代码写css的时候， 写的这个px的值， 在手机上的视口中， 真实所占的长度


移动端的视口是通过html中的meta标签， name属性为viewport， 然后在设置content的值，来设置视口宽度，高度， 缩放比等，
视口的设置对pc端没有影响， 对移动端很重要