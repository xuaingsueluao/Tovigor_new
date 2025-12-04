@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER", "NAME_SHADOWING", "UNNECESSARY_NOT_NULL_ASSERTION")
package uts.sdk.modules.wzlSerialbridge
import android.util.Base64
import com.example.serialbridge.DataBits
import com.example.serialbridge.Parity
import com.example.serialbridge.SerialPort
import com.example.serialbridge.StopBits
import io.dcloud.uniapp.*
import io.dcloud.uniapp.extapi.*
import io.dcloud.uts.*
import io.dcloud.uts.Map
import io.dcloud.uts.Set
import io.dcloud.uts.UTSAndroid
import java.io.File
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import com.example.serialbridge.SerialConfig as SerialConfig1
typealias DataBitsType = Number
typealias StopBitsType = Number
typealias ParityType = String
open class SerialConfig (
    open var baudRate: Number? = null,
    open var dataBits: DataBitsType? = null,
    open var stopBits: StopBitsType? = null,
    open var parity: ParityType? = null,
) : UTSObject()
open class OpenOptions (
    @JsonNotNull
    open var path: String,
    open var config: SerialConfig? = null,
    open var success: ((res: OpenResult) -> Unit)? = null,
    open var fail: ((err: SerialError) -> Unit)? = null,
    open var complete: ((res: Any) -> Unit)? = null,
) : UTSObject()
open class OpenResult (
    @JsonNotNull
    open var errMsg: String,
    @JsonNotNull
    open var portId: Number,
) : UTSObject()
open class WriteOptions (
    @JsonNotNull
    open var portId: Number,
    @JsonNotNull
    open var data: String,
    open var format: String? = null,
    open var timeout: Number? = null,
    open var success: ((res: WriteResult) -> Unit)? = null,
    open var fail: ((err: SerialError) -> Unit)? = null,
    open var complete: ((res: Any) -> Unit)? = null,
) : UTSObject()
open class WriteResult (
    @JsonNotNull
    open var errMsg: String,
    @JsonNotNull
    open var bytesWritten: Number,
) : UTSObject()
open class ReadOptions (
    @JsonNotNull
    open var portId: Number,
    open var length: Number? = null,
    open var format: String? = null,
    open var timeout: Number? = null,
    open var success: ((res: ReadResult) -> Unit)? = null,
    open var fail: ((err: SerialError) -> Unit)? = null,
    open var complete: ((res: Any) -> Unit)? = null,
) : UTSObject()
open class ReadResult (
    @JsonNotNull
    open var errMsg: String,
    @JsonNotNull
    open var data: String,
    @JsonNotNull
    open var bytesRead: Number,
) : UTSObject()
open class CloseOptions (
    @JsonNotNull
    open var portId: Number,
    open var success: ((res: CloseResult) -> Unit)? = null,
    open var fail: ((err: SerialError) -> Unit)? = null,
    open var complete: ((res: Any) -> Unit)? = null,
) : UTSObject()
open class CloseResult (
    @JsonNotNull
    open var errMsg: String,
) : UTSObject()
open class ListDevicesOptions (
    open var prefixes: UTSArray<String>? = null,
    open var success: ((res: ListDevicesResult) -> Unit)? = null,
    open var fail: ((err: SerialError) -> Unit)? = null,
    open var complete: ((res: Any) -> Unit)? = null,
) : UTSObject()
open class ListDevicesResult (
    @JsonNotNull
    open var errMsg: String,
    @JsonNotNull
    open var devices: UTSArray<String>,
) : UTSObject()
typealias SerialErrorCode = Number
interface SerialError : IUniError {
    override var errCode: SerialErrorCode
}
val UniErrorSubject = "wzl-serialbridge"
val SerialUniErrors: Map<SerialErrorCode, String> = Map(_uA(
    _uA(
        10001,
        "打开串口失败"
    ),
    _uA(
        10002,
        "写入数据失败"
    ),
    _uA(
        10003,
        "读取数据失败"
    ),
    _uA(
        10004,
        "关闭串口失败"
    ),
    _uA(
        10005,
        "串口未打开"
    ),
    _uA(
        10006,
        "参数错误"
    ),
    _uA(
        10007,
        "数据格式错误"
    )
))
open class SerialErrorImpl : UniError, SerialError {
    override var errCode: SerialErrorCode
    constructor(errCode: SerialErrorCode) : super() {
        this.errSubject = UniErrorSubject
        this.errCode = errCode
        this.errMsg = SerialUniErrors.get(errCode) ?: ""
    }
}
fun __probe(): Number {
    return 42
}
val serialPorts: Map<Int, SerialPort> = Map()
var portIdCounter: Int = 1
fun generatePortId(): Int {
    return portIdCounter++
}
fun parseParity(parity: String): Parity {
    when (parity.toLowerCase()) {
        "odd" -> 
            return Parity.ODD
        "even" -> 
            return Parity.EVEN
        else -> 
            return Parity.NONE
    }
}
fun hexToBytes(hex: String): ByteArray {
    val cleanHex = hex.replace(UTSRegExp("\\s+", "g"), "").replace(UTSRegExp("^0x", "i"), "")
    val len: Int = cleanHex.length.toInt()
    val bytes = ByteArray((len / 2).toInt())
    run {
        var i: Number = 0
        while(i < len){
            val start: Int = i.toInt()
            val end: Int = (i + 2).toInt()
            val byte = parseInt(cleanHex.substring(start, end), 16)
            bytes[(i / 2).toInt()] = byte.toByte()
            i += 2
        }
    }
    return bytes
}
fun bytesToHex(bytes: ByteArray, length: Number): String {
    val hexChars = "0123456789ABCDEF"
    val n: Int = length.toInt()
    var result = ""
    run {
        var i: Number = 0
        while(i < n){
            val idx: Int = i.toInt()
            val v = (bytes[idx].toInt() and 0xFF)
            result += hexChars[(v shr 4)]
            result += hexChars[(v and 0x0F)]
            i++
        }
    }
    return result
}
fun base64ToBytes(base64: String): ByteArray {
    return Base64.decode(base64, Base64.DEFAULT)
}
fun bytesToBase64(bytes: ByteArray, length: Number): String {
    val trimmedBytes = bytes.copyOf(length.toInt())
    return Base64.encodeToString(trimmedBytes, Base64.DEFAULT)
}
fun openSerial(options: OpenOptions) {
    try {
        if (options.path == null || options.path.length == 0) {
            val err = SerialErrorImpl(10006)
            err.errMsg = "设备路径不能为空"
            options.fail?.invoke(err)
            options.complete?.invoke(err)
            return
        }
        val config = options.config ?: SerialConfig()
        val baudRate = config.baudRate ?: 115200
        val dataBitsValue = config.dataBits ?: 8
        val stopBitsValue = config.stopBits ?: 1
        val parityValue = config.parity ?: "none"
        var dataBits: DataBits
        if (dataBitsValue == 5) {
            dataBits = DataBits.DATA_BITS_5
        } else if (dataBitsValue == 6) {
            dataBits = DataBits.DATA_BITS_6
        } else if (dataBitsValue == 7) {
            dataBits = DataBits.DATA_BITS_7
        } else {
            dataBits = DataBits.DATA_BITS_8
        }
        var stopBits: StopBits
        if (stopBitsValue == 2) {
            stopBits = StopBits.STOP_BITS_2
        } else {
            stopBits = StopBits.STOP_BITS_1
        }
        val parity = parseParity(parityValue)
        val serialConfig = SerialConfig1(baudRate.toInt(), dataBits, stopBits, parity)
        val serialPort = SerialPort(options.path, serialConfig)
        val portId = generatePortId()
        serialPorts.set(portId, serialPort)
        val res = OpenResult(errMsg = "openSerial:ok", portId = portId)
        options.success?.invoke(res)
        options.complete?.invoke(res)
    }
     catch (e: Exception) {
        val err = SerialErrorImpl(10001)
        err.errMsg = "打开串口失败: " + e.message
        options.fail?.invoke(err)
        options.complete?.invoke(err)
    }
}
fun writeSerial(options: WriteOptions) {
    try {
        val serialPort = serialPorts.get(options.portId.toInt())
        if (serialPort == null) {
            val err = SerialErrorImpl(10005)
            err.errMsg = "串口未打开，请先调用 openSerial"
            options.fail?.invoke(err)
            options.complete?.invoke(err)
            return
        }
        val format = options.format ?: "hex"
        var dataBytes: ByteArray
        if (format == "hex") {
            dataBytes = hexToBytes(options.data)
        } else if (format == "base64") {
            dataBytes = base64ToBytes(options.data)
        } else {
            val err = SerialErrorImpl(10007)
            err.errMsg = "不支持的数据格式: " + format
            options.fail?.invoke(err)
            options.complete?.invoke(err)
            return
        }
        val timeout = options.timeout ?: 1000
        val bytesWritten = serialPort.write(dataBytes, timeout.toInt())
        val res = WriteResult(errMsg = "writeSerial:ok", bytesWritten = bytesWritten)
        options.success?.invoke(res)
        options.complete?.invoke(res)
    }
     catch (e: Exception) {
        val err = SerialErrorImpl(10002)
        err.errMsg = "写入数据失败: " + e.message
        options.fail?.invoke(err)
        options.complete?.invoke(err)
    }
}
fun readSerial(options: ReadOptions) {
    try {
        val serialPort = serialPorts.get(options.portId.toInt())
        if (serialPort == null) {
            val err = SerialErrorImpl(10005)
            err.errMsg = "串口未打开，请先调用 openSerial"
            options.fail?.invoke(err)
            options.complete?.invoke(err)
            return
        }
        val length = options.length ?: 1024
        val timeout = options.timeout ?: 1000
        val buffer = ByteArray(length.toInt())
        val bytesRead = serialPort.read(buffer, timeout.toInt())
        val format = options.format ?: "hex"
        var dataStr: String
        if (format == "hex") {
            dataStr = bytesToHex(buffer, bytesRead)
        } else if (format == "base64") {
            dataStr = bytesToBase64(buffer, bytesRead)
        } else {
            val err = SerialErrorImpl(10007)
            err.errMsg = "不支持的数据格式: " + format
            options.fail?.invoke(err)
            options.complete?.invoke(err)
            return
        }
        val res = ReadResult(errMsg = "readSerial:ok", data = dataStr, bytesRead = bytesRead)
        options.success?.invoke(res)
        options.complete?.invoke(res)
    }
     catch (e: Exception) {
        val err = SerialErrorImpl(10003)
        err.errMsg = "读取数据失败: " + e.message
        options.fail?.invoke(err)
        options.complete?.invoke(err)
    }
}
fun closeSerial(options: CloseOptions) {
    try {
        val serialPort = serialPorts.get(options.portId.toInt())
        if (serialPort == null) {
            val err = SerialErrorImpl(10005)
            err.errMsg = "串口未打开"
            options.fail?.invoke(err)
            options.complete?.invoke(err)
            return
        }
        serialPort.close()
        serialPorts.`delete`(options.portId.toInt())
        val res = CloseResult(errMsg = "closeSerial:ok")
        options.success?.invoke(res)
        options.complete?.invoke(res)
    }
     catch (e: Exception) {
        val err = SerialErrorImpl(10004)
        err.errMsg = "关闭串口失败: " + e.message
        options.fail?.invoke(err)
        options.complete?.invoke(err)
    }
}
fun listDevices(options: ListDevicesOptions?) {
    try {
        val prefixes = options?.prefixes ?: _uA(
            "/dev/ttyS",
            "/dev/ttyUSB",
            "/dev/ttyAMA"
        )
        val devices: UTSArray<String> = _uA()
        val devDir = File("/dev")
        if (devDir.exists() && devDir.isDirectory()) {
            val files = devDir.listFiles()
            if (files != null) {
                val n: Int = files.size
                run {
                    var i: Number = 0
                    while(i < n){
                        val idx: Int = i.toInt()
                        val file = files[idx]
                        val path = file.getAbsolutePath()
                        for(prefix in resolveUTSKeyIterator(prefixes)){
                            if (path.startsWith(prefix)) {
                                devices.push(path)
                                break
                            }
                        }
                        i++
                    }
                }
            }
        }
        val res = ListDevicesResult(errMsg = "listDevices:ok", devices = devices)
        options?.success?.invoke(res)
        options?.complete?.invoke(res)
    }
     catch (e: Exception) {
        val err = SerialErrorImpl(10006)
        err.errMsg = "列举设备失败: " + e.message
        options?.fail?.invoke(err)
        options?.complete?.invoke(err)
    }
}
fun getVersion(): String {
    return "1.0.0"
}
open class OpenOptionsJSONObject : UTSJSONObject() {
    open lateinit var path: String
    open var config: SerialConfig? = null
    open var success: UTSCallback? = null
    open var fail: UTSCallback? = null
    open var complete: UTSCallback? = null
}
open class WriteOptionsJSONObject : UTSJSONObject() {
    open lateinit var portId: Number
    open lateinit var data: String
    open var format: String? = null
    open var timeout: Number? = null
    open var success: UTSCallback? = null
    open var fail: UTSCallback? = null
    open var complete: UTSCallback? = null
}
open class ReadOptionsJSONObject : UTSJSONObject() {
    open lateinit var portId: Number
    open var length: Number? = null
    open var format: String? = null
    open var timeout: Number? = null
    open var success: UTSCallback? = null
    open var fail: UTSCallback? = null
    open var complete: UTSCallback? = null
}
open class CloseOptionsJSONObject : UTSJSONObject() {
    open lateinit var portId: Number
    open var success: UTSCallback? = null
    open var fail: UTSCallback? = null
    open var complete: UTSCallback? = null
}
open class ListDevicesOptionsJSONObject : UTSJSONObject() {
    open var prefixes: UTSArray<String>? = null
    open var success: UTSCallback? = null
    open var fail: UTSCallback? = null
    open var complete: UTSCallback? = null
}
fun __probeByJs(): Number {
    return __probe()
}
fun openSerialByJs(options: OpenOptionsJSONObject) {
    return openSerial(OpenOptions(path = options.path, config = options.config, success = fun(res: OpenResult): Unit {
        options.success?.invoke(res)
    }
    , fail = fun(err: SerialError): Unit {
        options.fail?.invoke(err)
    }
    , complete = fun(res: Any): Unit {
        options.complete?.invoke(res)
    }
    ))
}
fun writeSerialByJs(options: WriteOptionsJSONObject) {
    return writeSerial(WriteOptions(portId = options.portId, data = options.data, format = options.format, timeout = options.timeout, success = fun(res: WriteResult): Unit {
        options.success?.invoke(res)
    }
    , fail = fun(err: SerialError): Unit {
        options.fail?.invoke(err)
    }
    , complete = fun(res: Any): Unit {
        options.complete?.invoke(res)
    }
    ))
}
fun readSerialByJs(options: ReadOptionsJSONObject) {
    return readSerial(ReadOptions(portId = options.portId, length = options.length, format = options.format, timeout = options.timeout, success = fun(res: ReadResult): Unit {
        options.success?.invoke(res)
    }
    , fail = fun(err: SerialError): Unit {
        options.fail?.invoke(err)
    }
    , complete = fun(res: Any): Unit {
        options.complete?.invoke(res)
    }
    ))
}
fun closeSerialByJs(options: CloseOptionsJSONObject) {
    return closeSerial(CloseOptions(portId = options.portId, success = fun(res: CloseResult): Unit {
        options.success?.invoke(res)
    }
    , fail = fun(err: SerialError): Unit {
        options.fail?.invoke(err)
    }
    , complete = fun(res: Any): Unit {
        options.complete?.invoke(res)
    }
    ))
}
fun listDevicesByJs(options: ListDevicesOptionsJSONObject?) {
    return listDevices(if (options != null) {
        ListDevicesOptions(prefixes = options!!.prefixes, success = fun(res: ListDevicesResult): Unit {
            options!!.success?.invoke(res)
        }, fail = fun(err: SerialError): Unit {
            options!!.fail?.invoke(err)
        }, complete = fun(res: Any): Unit {
            options!!.complete?.invoke(res)
        })
    } else {
        null
    }
    )
}
fun getVersionByJs(): String {
    return getVersion()
}
