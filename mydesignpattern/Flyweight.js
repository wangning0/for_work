/**
 *  享元模式是一种用于性能优化的模式，享元模式的核心是运用共享技术来支持大量细粒度的对象
 * 
 */

/**
 *  假设有个内衣工厂， 50种男士和50种女士的内衣，现在要生产模特来拍广告，正常情况下是需要50个男和50个女模特，但是使用了享元模式后，只需要
 *  一个男模特一个女模特即可
 */

// 非享元
(function() {
    function Model(sex, undeware) {
        this.sex = sex;
        this.undeware = undeware;
    }

    Model.prototype.takePhoto = function() {
       // console.log('sex=' + this.sex + ' undeware=' + this.undeware);
    }
    var start = Date.now();
    for(var i = 1; i <= 500; i++) {
        var maleModel = new Model('male', 'undeware' + i);
        maleModel.takePhoto();
    }

    for(var j = 1; j <= 500; j++) {
        var femaleModel= new Model('female', 'undeware' + j);
        femaleModel.takePhoto();
    }
    console.log(Date.now() - start);
})();

// 享元模式
(function() {
    function Model(sex) {
        this.sex = sex;
    }
    Model.prototype.takePhoto = function() {
       // console.log('sex=' + this.sex + ' undeware=' + this.undeware);
    }
    var maleModel = new Model('male');
    var femaleModel = new Model('female');
    var start = Date.now();
    for(var i = 1; i <= 500; i++) {
        maleModel.undeware = 'undeware' + i;
        maleModel.takePhoto();
    }

    for(var i = 1; i <= 500; i++) {
        femaleModel.undeware = 'undeware' + i;
        femaleModel.takePhoto();
    }
    console.log(Date.now() - start);
})()

/**
 *  内部状态和外部状态
 *      享元模式要求将对象的属性划分为内部状态和外部状态，享元模式的目标是尽量减少共享对象的数量，如何划分内部和外部状态？
 * 
 *          1. 内部状态存储于对象内部
 *          2. 内部对象可以被一些对象共享
 *          3. 内部对象独立于具体的场景，通常不会变
 *          4. 外部状态取决于具体的场景，并根据场景变化，外部状态不能共享
 */

/**
 *  实际场景： 图片上传，多张图片可以上传，点击后统一上传
 */

var Upload = function(uploadType) {
    this.uploadType = uploadType;
}

Upload.prototype.delFile = function(id) {
    uploadManager.setExternalState(id, this);
    this.dom.parentNode.removeChild(this.dom);
}


var UploadFactory = (function() {
    var createdFlyWeightObjs = {};
    return {
        create: function(uploadType) {
            if(createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            } else {
                return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
            }
        }
    }
})();

var uploadManager = (function() {
    var uploadDatabase = {};
    return {
        add: function(id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement('div');
            div.innerHTML = '<span>文件名称:'+ fileName +'文件大小:'+ fileSize +'</span>' + 
                            '<button class="delFile>删除</button>';
            dom.querySelector('.delFile').onclick = function() {
                flyWeightObj.delFile(id);
            }
            
            document.body.appendChild(dom);

            uploadDatabase[id] = {
                fieName: fileName,
                fileSize: fileSize,
                id: id
            }

            return flyWeightObj;
        },
        setExternalState: function(id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for(var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

// 触发

var id = 0;
window.statrUpload = function(uploadType, files) {
    for(var i = 0, file; file = files[i++] ; ) {
        uploadManager.add(++id, uploadType, file.fieName, file.fileSize);
    }
}


/**
 *  享元模式的适用性
 * 
 *      1. 一个程序中使用了大量的相似对象
 *      2. 由于使用了大量的相似对象造成了很大的内存开销
 *      3. 对象的大多数状态是外部状态
 *      4. 剥离出对象的外部状态之后，可以使用相对较少的共享对象取代大量对象
 * 
 */



/**
 * 
 *  对象池： 对象池维护一个装载空闲对象的池子，如果需要对象的时候，而不是直接new，而是从对象池中去取，如果对象池中也没有对应的空闲对象，那么我们就new一个
 *  
 */

// 喜迎家的项目中的打tag 就可以用对象池做优化

// 通用对象池的实现

var objectPollFactory = function(createObjFn) {
    var objectPoll = [];

    return {
        create: function() {
            var obj = objectPoll.length ? objectPoll.shift() : createObjFn.apply(this, arguments);
            return obj;
        },
        recover: function(obj) {
            objectPoll.push(obj);
        }
    }
}