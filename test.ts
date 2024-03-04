// tests go here; this will not be compiled when this package is used as an extension.
serial.redirect(
    SerialPin.USB_TX,
    SerialPin.USB_RX,
    BaudRate.BaudRate9600
)

basic.showString("T1")
basic.showIcon(IconNames.Butterfly)
music.play(music.builtinPlayableSoundEffect(soundExpression.slide), music.PlaybackMode.UntilDone)

serial.writeString("Welcome to dojo:bot BLOCK TESTER NEW\n")
dojo.bot_init()

dojo.bot_led_RGB(dojo.LED_ID.LED1, 0, 0, 255)
dojo.bot_led_colour(dojo.LED_ID.LED2, dojo.COLOUR.YELLOW)
dojo.bot_led_RGB(dojo.LED_ID.LED3, 255, 0, 0)

dojo.bot_servo_position(dojo.SERVO_ID.SERVO_JAW1, 45)





