/*
Dojo Functions
*/

/**
* Custom blocks
*/
//% block="Dojo:Bot" weight=100 color=#0fbc11 icon="\uf11b" blockGap=8
//% groups=['LEDs and Relay', 'Servos', 'Inputs']
namespace dojo {

    let _DEBUG: boolean = false
    const debug = (msg: string) => {
        if (_DEBUG === true) {
            serial.writeLine(msg)
        }
    }

    const MAX_BRIGHTNESS = 0.3

    export let servo_left_position: number = 90;
    export let servo_left_min: number = 0;
    export let servo_left_max: number = 180;
    export let servo_right_position: number = 90;
    export let servo_right_min: number = 0;
    export let servo_right_max: number = 180;
    export let servo_rotate_position: number = 90;
    export let servo_rotate_min: number = 0;
    export let servo_rotate_max: number = 180;
    export let servo_jaw1_position: number = 90;
    export let servo_jaw1_min: number = 0;
    export let servo_jaw1_max: number = 180;
    export let servo_jaw2_position: number = 90;
    export let servo_jaw2_min: number = 0;
    export let servo_jaw2_max: number = 180;

    export let positionA_left: number = 90
    export let positionA_right: number = 90
    export let positionA_rotate: number = 90
    export let positionA_jaw1: number = 90
    export let positionA_jaw2: number = 90

    export let positionB_left: number = 90
    export let positionB_right: number = 90
    export let positionB_rotate: number = 90
    export let positionB_jaw1: number = 90
    export let positionB_jaw2: number = 90


    export enum LED_ID {
        //% block="LED1"
        LED1 = 1,
        //% block="LED2"
        LED2 = 2,
        //% block="LED3"
        LED3 = 3
    }

    export enum POSITION_ID {
        A = 1,
        B = 2,
        C = 3
    }

    export enum SERVO_POS {
        //% block="Centre"
        CEN = 90,
        //% block="Max"
        MAX = 180,
        //% block="Min"
        MIN = 0
    }

    export enum SERVO_ID {
        //% block="Left"
        SERVO_LEFT = 6,
        //% block="Right"
        SERVO_RIGHT = 0,
        //% block="Rotate"
        SERVO_ROTATE = 1,
        //% block="Jaw1"
        SERVO_JAW1 = 5,
        //% block="Jaw2"
        SERVO_JAW2 = 4,
        //% block="ALL"
        SERVO_ALL = 255
    }

    export enum SERVO_ID2 {
        //% block="Left"
        SERVO_LEFT = 6,
        //% block="Right"
        SERVO_RIGHT = 0,
        //% block="Rotate"
        SERVO_ROTATE = 1,
        //% block="Jaw1"
        SERVO_JAW1 = 5,
        //% block="Jaw2"
        SERVO_JAW2 = 4,
    }

    export enum BUTTON {
        A = 0,
        B = 1,
        C = 2
    }

    enum LED_CH {
        LED1R = 2,
        LED1G = 9,
        LED1B = 8,
        LED2R = 10,
        LED2G = 11,
        LED2B = 12,
        LED3R = 14,
        LED3G = 13,
        LED3B = 15
    }

    export enum COLOUR {
        RED = 0xFF0000,
        GREEN = 0x00FF00,
        BLUE = 0x0000FF,
        YELLOW = 0xFFFF00,
        ORANGE = 0xFFA500,
        PURPLE = 0xa020f0,
        WHITE = 0xFFFFFF,
        //% block="BLACK(OFF)"
        BLACK = 0x000000,
        OFF = 0x000000,
        BROWN = 0x964b00,
        PINK = 0xffc0cb,
        CYAN = 0x00FFFF,
        BEIGE = 0xF5F5DC
    }

    export enum ADC_CH {
        //% block="Left JoyS Y"
        ADC_CH_LEFTJOY_Y = 1,    //mismatch to v1 PCB label
        //% block="Left JoyS X"
        ADC_CH_LEFTJOY_X = 0,    //mismatch to v1 PCB label
        //% block="Slider"
        ADC_CH_SLIDE = 2,
        //% block="Expansion"
        ADC_CH_EXPANS = 3,
        //% block="Right JoyS Y"
        ADC_CH_RIGHTJOY_Y = 5,    //mismatch to v1 PCB label
        //% block="Right JoyS X"
        ADC_CH_RIGHTJOY_X = 4,    //mismatch to v1 PCB label
        //% block="Knob"
        ADC_CH_KNOB = 6,
        //% block="PCB Version"
        ADC_CH_VERSION = 7
    }

    //ADC channel commands, 4LSB set so internal reference is ON and A to D is ON
    const ADC_REG_CH_LEFTJOY_Y = 0x8C
    const ADC_REG_CH_LEFTJOY_X = 0xCC
    const ADC_REG_CH_SLIDE = 0x9C
    const ADC_REG_CH_EXPANS = 0xDC
    const ADC_REG_CH_RIGHTJOY_Y = 0xAC
    const ADC_REG_CH_RIGHTJOY_X = 0xEC
    const ADC_REG_CH_KNOB = 0xBC
    const ADC_REG_CH_VERSION = 0xFC

    //ADC7828 Analog to Digital Chip Address
    const ADC_ADDR = 0x48               //This is 7bit address (in 8bit format it is 0x90)

    //PCA9685 PWM chip hardware config
    const PWM_ADDRESS = 0x40            //This is 7bit address (in 8bit format it is 0x80)

    //PCA9685 PWM chip register locations
    const PWM_REG_PRESCALE = 0xFE       //the prescale register address
    const PWM_REG_MODE1 = 0x00          // MODE1
    const PWM_REG_MODE2 = 0x01          // MODE2

    const PWM_REG_CH0_ON_L = 0x06       // Channel 0 output and brightness control ON byte 0
    const PWM_REG_CH0_ON_H = 0x07       // Channel 0 output and brightness control ON byte 1
    const PWM_REG_CH0_OFF_L = 0x08      // Channel 0 output and brightness control OFF byte 2
    const PWM_REG_CH0_OFF_H = 0x09      // Channel 0 output and brightness control OFF byte 3

    const PWM_REG_ALL_ON_L = 0xFA       // All channels output and brightness control ON byte 0
    const PWM_REG_ALL_ON_H = 0xFB       // All channels output and brightness control ON byte 1
    const PWM_REG_ALL_OFF_L = 0xFC      // All channels output and brightness control OFF byte 2
    const PWM_REG_ALL_OFF_H = 0xFD      // All channels output and brightness control OFF byte 3

    //Default values for chip settings

    /*Mode1
        Bit7 = restart on
        Bit6 = ext clk on
        Bit5 = auto increment on
        Bit4 = sleep on
        Bit3 = respond to subaddr1
        Bit2 = respond to subaddr2
        Bit1 = respond to subaddr3
        Bit0 = respond to an all call
    */
    const pwm_mode1_default = 0x01
    const pwm_mode1_sleep = pwm_mode1_default | 0x10; // Set sleep bit to 1
    const pwm_mode1_wake = pwm_mode1_default & 0xEF; // Set sleep bit to 0
    const pwm_mode1_restart = pwm_mode1_wake | 0x80; // Set restart bit to 1

    /*Mode2
        Bit7 to 5 reserved
        Bit4 = invert output logic
        Bit3 = change outputs on I2C ACK  (off = change on STOP)
        Bit2 = set outputs to totem pole (off = open-drain)
        Bit1 and 0: output behaviour in case of OE pin = 1
            00: output = 0
            01: output = 1 when totem pole, or high impedance when open-drain
            10: output = high-impedance
    */
    const pwm_mode2_default = 0x04    //open-drain, change outputs on Ack

    /*Prescaler and timing
        Determines frequencies at which outputs modulate
        Minimum value is 3

        prescale = (osc_clock / (4096 * update rate)) - 1

        update_rate is the frequency required (200Hz default, when prescale is 1Eh = 30)
        servos recommended 40-200hz, but most use 50hz

        internal oscillator is 25mhz
        therefore 50hz update rate:
        prescale = 121d = 79h
        
    */
    const pwm_prescale_servo = 121    //50hz for servo
    const pwm_prescale_LED = 0x1D     //200hz for LEDs

    /*Output ON and OFF control registers

        Each PWM cycle is 4096 long
        The ON register sets the count (time) for rising edge to HIGH, to allow stagger to avoid current draw
        The OFF register sets the count (time) for falling edge to LOW
        
        Example
        We want rising edge delayed to 10% within cycle
        We want HIGH period to be 20%   (so LOW period is 80%) 
        10% = 410d counts = 19Ah (in hex).  Reduce by 1 as counter ends at 4095 -> Rising edge @ 199h
        20% = 819d counts
        Off time = 410 + 819 - 1 = 1228 -> Falling edge @ 4CCh
        Set ON_H = 01h, ON_L = 99h, OFF_H = 04h, OFF_L = ChipConfig
        
        Notes on delays
        Should stagger LED start times, but servos can all be at 0
        Falling edge can occur "before" rising edge if delay is such that it wraps into next cycle

        Exceptions
        Setting Bit4 in ON_H register to 1 sets the output to permanently ON
        Setting Bit4 in OFF_H register to 1 sets the output to permanently OFF
    */
    //Output always on
    const pwm_output_always_on_l = 0
    const pwm_output_always_on_h = 0x10
    const pwm_output_always_off_l = 0
    const pwm_output_always_off_h = 0
    //Output always off
    const pwm_output_never_on_l = 0
    const pwm_output_never_on_h = 0
    const pwm_output_never_off_l = 0
    const pwm_output_never_off_h = 0x10

    function write(register: number, value: number): void {
        const buffer = pins.createBuffer(2)
        buffer[0] = register
        buffer[1] = value
        pins.i2cWriteBuffer(PWM_ADDRESS, buffer, false)
    }

    /**
    * Set serial output for debug purposes
    * @param debugEnabled is true or false
    */
    //% block="Debug $debugEnabled"
    //% debugEnabled.shadow=toggleOnOff
    export function setDebug(debugEnabled: boolean): void {
        _DEBUG = debugEnabled
    }

    //DOJO:BOT SPECIFIC CODE

    export function bot_joy_to_move(inputval: number): number {
        let amount_to_move = 0;
        //Input is +100 to -100.  -100 -> 3 and vv
        amount_to_move = (-3 * inputval) / 100
        return amount_to_move;
    }

    /**
    * Initialise the dojo:bot and centre servos.  
    * No parameters, uses default values
    */
    //% block="Initialise"
    export function bot_init(): void {
        debug(`Init chip at address 0x40, 50Hz update rate`)
        const buf = pins.createBuffer(2)

        write(PWM_REG_MODE1, pwm_mode1_sleep)

        write(PWM_REG_PRESCALE, pwm_prescale_servo)

        //Set all to zero
        write(PWM_REG_ALL_ON_L, 0x00)
        write(PWM_REG_ALL_ON_H, 0x00)
        write(PWM_REG_ALL_OFF_L, 0x00)
        write(PWM_REG_ALL_OFF_H, 0x00)

        write(PWM_REG_MODE1, pwm_mode1_wake)

        //1000us (1ms) delay (allows oscillator to stabilise, min 500us)
        control.waitMicros(1000)
        write(PWM_REG_MODE1, pwm_mode1_restart)

        //Initiate and setup analog to digital converter (ADC) chip
    }

    /**
        * Store current position of robot at A
        * Stores Left, Right, Rotate, Jaw1, Jaw2
        */
    //% block="Store position A"
    //% group="Servos"
    export function bot_servo_store_positionA(): void {
                positionA_left = servo_left_position
                positionA_right = servo_right_position
                positionA_rotate = servo_rotate_position
                positionA_jaw1 = servo_jaw1_position
                positionA_jaw2 = servo_jaw2_position
    }

    /**
        * Store current position of robot at B 
        * Stores Left, Right, Rotate, Jaw1, Jaw2
        */
    //% block="Store position B"
    //% group="Servos"
    export function bot_servo_store_positionB(): void {
        positionB_left = servo_left_position
        positionB_right = servo_right_position
        positionB_rotate = servo_rotate_position
        positionB_jaw1 = servo_jaw1_position
        positionB_jaw2 = servo_jaw2_position
    }

    /**
        * Move robot to stored position A 
        * Moves Left, Right, Rotate BUT NOT Jaw1, Jaw2
        */
    //% block="Go to position A"
    //% group="Servos"
    export function bot_servo_go_positionA(): void {
                bot_servo_position(SERVO_ID.SERVO_LEFT, positionA_left)
                bot_servo_position(SERVO_ID.SERVO_RIGHT, positionA_right)
                bot_servo_position(SERVO_ID.SERVO_ROTATE, positionA_rotate)
    }

    /**
        * Move robot to stored position A 
        * Moves Left, Right, Rotate BUT NOT Jaw1, Jaw2
        */
    //% block="Go to position A"
    //% group="Servos"
    export function bot_servo_go_positionB(): void {
        bot_servo_position(SERVO_ID.SERVO_LEFT, positionB_left)
        bot_servo_position(SERVO_ID.SERVO_RIGHT, positionB_right)
        bot_servo_position(SERVO_ID.SERVO_ROTATE, positionB_rotate)
    }

    /**
        * Move a servo by a number of degrees
        * @param ser_id the servo ID, selected from list
        * @param degrees_rel from -20 to +20 degrees
        * Single servo will only move within its min-max limits.  ALL includes this
        */
    //% block="Move servo %ser_id by %degrees"
    //% degrees_rel.min=-20
    //% degrees_rel.max=20
    //% degrees_rel.defl=0
    //% degrees_rel.fieldOptions.precision=0.1
    //% group="Servos"
    export function bot_servo_position_rel(ser_id: SERVO_ID, degrees_rel: number): void {
        degrees_rel = Math.constrain(degrees_rel, -20, 20)
        switch (ser_id) {
            case SERVO_ID.SERVO_ALL:
                bot_servo_int(SERVO_ID.SERVO_LEFT, servo_left_position + degrees_rel, true);
                bot_servo_int(SERVO_ID.SERVO_RIGHT, servo_right_position + degrees_rel, true);
                bot_servo_int(SERVO_ID.SERVO_ROTATE, servo_rotate_position + degrees_rel, true);
                bot_servo_int(SERVO_ID.SERVO_JAW1, servo_jaw1_position + degrees_rel, true);
                bot_servo_int(SERVO_ID.SERVO_JAW2, servo_jaw2_position + degrees_rel, true);
                break
            case SERVO_ID.SERVO_LEFT:
                bot_servo_int(SERVO_ID.SERVO_LEFT, servo_left_position + degrees_rel, true);
                break
            case SERVO_ID.SERVO_RIGHT:
                bot_servo_int(SERVO_ID.SERVO_RIGHT, servo_right_position + degrees_rel, true);
                break
            case SERVO_ID.SERVO_ROTATE:
                bot_servo_int(SERVO_ID.SERVO_ROTATE, servo_rotate_position + degrees_rel, true);
                break
            case SERVO_ID.SERVO_JAW1:
                bot_servo_int(SERVO_ID.SERVO_JAW1, servo_jaw1_position + degrees_rel, true);
                break
            case SERVO_ID.SERVO_JAW2:
                bot_servo_int(SERVO_ID.SERVO_JAW2, servo_jaw2_position + degrees_rel, true);
                break
        }
    }

    /**
    * Move a servo to a position
    * @param ser_id the servo ID, selected from list
    * @param degrees for chosen position (90 = centre)
    * Single servo will only move within its min-max limits.  ALL ignores this
    */
    //% block="Move servo %ser_id to position %degrees"
    //% degrees.min=0
    //% degrees.max=180
    //% degrees.defl=90
    //% degrees.fieldOptions.precision=0.1
    //% group="Servos"
    export function bot_servo_position(ser_id: SERVO_ID, degrees: number): void {
        if (ser_id == SERVO_ID.SERVO_ALL) {
            debug(`servo_internal ALL`)
            bot_servo_int(SERVO_ID.SERVO_LEFT, degrees, false);
            bot_servo_int(SERVO_ID.SERVO_RIGHT, degrees, false);
            bot_servo_int(SERVO_ID.SERVO_ROTATE, degrees, false);
            bot_servo_int(SERVO_ID.SERVO_JAW1, degrees, false);
            bot_servo_int(SERVO_ID.SERVO_JAW2, degrees, false);
        }
        else {
            debug(`servo_internal ${ser_id}`)
            bot_servo_int(ser_id, degrees, true);
        }
    }

    function bot_servo_int(ser_id: SERVO_ID, degrees: number, limits: boolean): void {
        // Setup for standard, 180degree servo
        // Generate a pulse between 1ms and 2ms with 1.5ms being 90 degrees
        // 0 degrees = 1ms, 180 degrees = 2ms
        debug(`start of servo_int`)
        let on_time: number
        let off_time: number

        //Rising edge always at 0
        on_time = 0
        //Check position within bounds
        debug(`servo_int before switch`)
        switch (ser_id) {
            case SERVO_ID.SERVO_LEFT:
                debug(`left`)
                if (limits == true) {
                    degrees = Math.max(servo_left_min, Math.min(servo_left_max, degrees))
                }
                servo_left_position = degrees
                debug(`servo left degrees ${degrees}`)
                break
            case SERVO_ID.SERVO_RIGHT:
                debug(`right`)
                if (limits == true) {
                    degrees = Math.max(servo_right_min, Math.min(servo_right_max, degrees))
                }
                servo_right_position = degrees
                debug(`servo right degrees ${degrees}`)
                break
            case SERVO_ID.SERVO_ROTATE:
                debug(`rotate`)
                if (limits == true) {
                    degrees = Math.max(servo_rotate_min, Math.min(servo_rotate_max, degrees))
                }
                servo_rotate_position = degrees
                debug(`servo rotate degrees ${degrees}`)
                break
            case SERVO_ID.SERVO_JAW1:
                debug(`jaw1`)
                if (limits == true) {
                    degrees = Math.max(servo_jaw1_min, Math.min(servo_jaw1_max, degrees))
                }
                debug(`jaw1 position`)
                servo_jaw1_position = degrees
                debug(`servo jaw1 degrees ${degrees}`)
                break
            case SERVO_ID.SERVO_JAW2:
                debug(`jaw2`)
                if (limits == true) {
                    degrees = Math.max(servo_jaw2_min, Math.min(servo_jaw2_max, degrees))
                }
                servo_jaw2_position = degrees
                debug(`servo jaw2 degrees ${degrees}`)
                break
        }
        degrees = Math.max(0, Math.min(180, degrees))
        debug(`degrees limited 0 to 180 ${degrees}`)

        //In theory servo's require 1ms to 2ms pulses
        //However, in reality needs adjusting by servo
        //Some examples
        //Sub-micro servo 580 to 2350     https://www.adafruit.com/product/2201
        //Micro servo high torque metal  500 to 2600   https://www.adafruit.com/product/2307
        //Standard servo - TowerPro SG - 5010  400 to 2400  https://www.adafruit.com/product/155
        //Analog Feedback Servo  600 to 2500 https://www.adafruit.com/product/1404
        //Micro servo - TowerPro SG - 92R:   500 to 2400 https://www.adafruit.com/product/169

        //This application uses 650 to 2350 as a default   (you could use 750 to 2250 but this typically gives 135 degrees movement)

        //Falling edge at 1ms to 2ms
        //50Hz, so 20ms is one set of 4095 counts
        //1ms = 4095 / 20 = 204.75 -> equivalent to 180 degrees 
        //Want 650ms (133 counts) for 0 degrees plus 1700ms (348) for 180 degrees
        off_time = ((degrees * 4095 * 1.7) / (20 * 180)) + 133
        //Write that to appropriate servo based on id
        //Servos 0, 1, 4, 5, 6
        ser_id = Math.max(0, Math.min(6, ser_id))

        debug(`Servo_internal setServo ${ser_id}`)

        const buffer = pins.createBuffer(2)
        const pinOffset = 4 * ser_id
        on_time = Math.max(0, Math.min(4095, on_time))
        off_time = Math.max(0, Math.min(4095, off_time))

        debug(`Servo_internal  On ${on_time}, Off ${off_time}, OS ${pinOffset}`)

        // Low byte of onStep
        write(pinOffset + PWM_REG_CH0_ON_L, on_time & 0xFF)

        // High byte of onStep
        write(pinOffset + PWM_REG_CH0_ON_H, (on_time >> 8) & 0x0F)

        // Low byte of offStep
        write(pinOffset + PWM_REG_CH0_OFF_L, off_time & 0xFF)

        // High byte of offStep
        write(pinOffset + PWM_REG_CH0_OFF_H, (off_time >> 8) & 0x0F)
    }

    /**
    * Control the LEDs on DojoBot, with individual RGB values
    * @param led_num is the LED chosen from list
    * @param red sets the red value from 0 to 255
    * @param green sets the green value from 0 to 255
    * @param blue sets the blue value from 0 to 255
    */
    //% block="Set %led_num to red %red green %green blue %blue" inlineInputMode=inline
    //% group="LEDs and Relay"
    //% red.min=1  red.max=255  red.fieldOptions.precision=1
    //% green.min=1  green.max=255  green.fieldOptions.precision=1
    //% blue.min=1  blue.max=255  blue.fieldOptions.precision=1
    export function bot_led_RGB(led_num: LED_ID, red: number, green: number, blue: number): void {

        let red_num: number
        let grn_num: number
        let blu_num: number
        let pinOffset: number

        //Set maximum brightness
        debug(`RGB before ${red} ${green} ${blue}`)
        red = Math.round(red * MAX_BRIGHTNESS)
        blue = Math.round(blue * MAX_BRIGHTNESS)
        green = Math.round(green * MAX_BRIGHTNESS)
        //Invert colours as we're sinking them
        debug(`RGB brightness adj ${red} ${green} ${blue}`)
        red = 255 - red
        green = 255 - green
        blue = 255 - blue
        debug(`RGB inverted ${red} ${green} ${blue}`)

        // If colour is set, then control it 
        // If colour is 0 then turn it Off
        // If colour is -1 then ignore it
        // Set LED ID to start with
        switch (led_num) {
            case LED_ID.LED1:
                red_num = LED_CH.LED1R
                grn_num = LED_CH.LED1G
                blu_num = LED_CH.LED1B
                debug(`LED ID 1, CH ${red_num} ${grn_num} ${blu_num}`)
                break
            case LED_ID.LED2:
                red_num = LED_CH.LED2R
                grn_num = LED_CH.LED2G
                blu_num = LED_CH.LED2B
                debug(`LED ID 2, CH ${red_num} ${grn_num} ${blu_num}`)
                break
            case LED_ID.LED3:
                red_num = LED_CH.LED3R
                grn_num = LED_CH.LED3G
                blu_num = LED_CH.LED3B
                debug(`LED ID 3, CH ${red_num} ${grn_num} ${blu_num}`)
                break
            default:
                debug(`bot_led - invalid LED value`)
                return
        }
        //Calculate PWM value
        //colour is a value from 0 to 255
        pinOffset = 4 * red_num
        switch (red) {
            case -1:
                //Don't do anything for RED
                debug(`RED -1`)
                break
            case 0:
                //Turn RED off
                write(pinOffset + PWM_REG_CH0_ON_L, pwm_output_never_on_l)
                write(pinOffset + PWM_REG_CH0_ON_H, pwm_output_never_on_h)
                write(pinOffset + PWM_REG_CH0_OFF_L, pwm_output_never_off_l)
                write(pinOffset + PWM_REG_CH0_OFF_H, pwm_output_never_off_h)
                debug(`RED OFF at pin ${pinOffset}`)
                break
            case 255:
                //Turn RED fully on
                write(pinOffset + PWM_REG_CH0_ON_L, pwm_output_always_on_l)
                write(pinOffset + PWM_REG_CH0_ON_H, pwm_output_always_on_h)
                write(pinOffset + PWM_REG_CH0_OFF_L, pwm_output_always_off_l)
                write(pinOffset + PWM_REG_CH0_OFF_H, pwm_output_always_off_h)
                debug(`RED ON at pin ${pinOffset}`)
                break
            default:
                //Set RED value
                red = Math.max(0, Math.min(255, red))
                let red_val_on = 0
                let red_val_off = Math.round((red * 4095) / 255)
                write(pinOffset + PWM_REG_CH0_ON_L, 0)
                write(pinOffset + PWM_REG_CH0_ON_H, 0)
                write(pinOffset + PWM_REG_CH0_OFF_L, red_val_off & 0xFF)
                write(pinOffset + PWM_REG_CH0_OFF_H, (red_val_off >> 8) & 0x0F)
                debug(`RED VAL on ${red_val_on} off ${red_val_off} at pin ${pinOffset}`)
        }

        pinOffset = 4 * grn_num
        switch (green) {
            case -1:
                //Don't do anything for GRN
                debug(`GRN -1`)
                break
            case 0:
                //Turn GRN off
                write(pinOffset + PWM_REG_CH0_ON_L, pwm_output_never_on_l)
                write(pinOffset + PWM_REG_CH0_ON_H, pwm_output_never_on_h)
                write(pinOffset + PWM_REG_CH0_OFF_L, pwm_output_never_off_l)
                write(pinOffset + PWM_REG_CH0_OFF_H, pwm_output_never_off_h)
                debug(`GRN OFF at pin ${pinOffset}`)
                break
            case 255:
                //Turn GRN fully on
                write(pinOffset + PWM_REG_CH0_ON_L, pwm_output_always_on_l)
                write(pinOffset + PWM_REG_CH0_ON_H, pwm_output_always_on_h)
                write(pinOffset + PWM_REG_CH0_OFF_L, pwm_output_always_off_l)
                write(pinOffset + PWM_REG_CH0_OFF_H, pwm_output_always_off_h)
                debug(`GRN ON at pin ${pinOffset}`)
                break
            default:
                //Set GRN value
                green = Math.max(0, Math.min(255, green))
                let grn_val_on = 0
                let grn_val_off = Math.round((green * 4095) / 255)
                write(pinOffset + PWM_REG_CH0_ON_L, 0)
                write(pinOffset + PWM_REG_CH0_ON_H, 0)
                write(pinOffset + PWM_REG_CH0_OFF_L, grn_val_off & 0xFF)
                write(pinOffset + PWM_REG_CH0_OFF_H, (grn_val_off >> 8) & 0x0F)
                debug(`GRN VAL on ${grn_val_on} off ${grn_val_off} at pin ${pinOffset}`)
        }

        pinOffset = 4 * blu_num
        switch (blue) {
            case -1:
                //Don't do anything for BLUE
                debug(`BLU -1`)
                break
            case 0:
                //Turn BLUE off
                write(pinOffset + PWM_REG_CH0_ON_L, pwm_output_never_on_l)
                write(pinOffset + PWM_REG_CH0_ON_H, pwm_output_never_on_h)
                write(pinOffset + PWM_REG_CH0_OFF_L, pwm_output_never_off_l)
                write(pinOffset + PWM_REG_CH0_OFF_H, pwm_output_never_off_h)
                debug(`BLU OFF at pin ${pinOffset}`)
                break
            case 255:
                //Turn BLUE fully on
                write(pinOffset + PWM_REG_CH0_ON_L, pwm_output_always_on_l)
                write(pinOffset + PWM_REG_CH0_ON_H, pwm_output_always_on_h)
                write(pinOffset + PWM_REG_CH0_OFF_L, pwm_output_always_off_l)
                write(pinOffset + PWM_REG_CH0_OFF_H, pwm_output_always_off_h)
                debug(`BLU ON at pin ${pinOffset}`)
                break
            default:
                //Set BLUE value
                blue = Math.max(0, Math.min(255, blue))
                let blu_val_on = 0
                let blu_val_off = Math.round((blue * 4095) / 255)
                write(pinOffset + PWM_REG_CH0_ON_L, 0)
                write(pinOffset + PWM_REG_CH0_ON_H, 0)
                write(pinOffset + PWM_REG_CH0_OFF_L, blu_val_off & 0xFF)
                write(pinOffset + PWM_REG_CH0_OFF_H, (blu_val_off >> 8) & 0x0F)
                debug(`BLU VAL on ${blu_val_on} off ${blu_val_off} at pin ${pinOffset}`)
        }
    }

    /**
    * Set LED to an RGB colour
    * @param led_num is the LED number selected
    * @param colour is the RGB colour chosen from list
    */
    //% block="Set %led to colour %colr"
    //% group="LEDs and Relay"
    export function bot_led_colour(led: LED_ID, colr: COLOUR): void {
        let red = colr >> 16
        let green = ((colr >> 8) & 0xFF)
        let blue = (colr & 0xFF)
        debug(`LED COLOUR CONVERT id ${led} red ${red} green ${green} blue ${blue}`)
        bot_led_RGB(led, red, green, blue)
    }

    /**
    * Turn the relay ON or OFF (for electromagnet)
    */
    //% block="Relay %val"
    //% group="LEDs and Relay"
    //% val.shadow=toggleOnOff
    export function bot_relay(val: boolean): void {
        if (val == true) {
            pins.digitalWritePin(DigitalPin.P9, 1)
            debug("R1")
        }
        else {
            pins.digitalWritePin(DigitalPin.P9, 0)
            debug("R0")
        }
    }

    function processjoystick(input: number): number {
        //Input is 0 to 4096 with 2200 as the centre value
        let answer
        input -= 2200
        //Now have a range of -2200 to 1896
        if (input > 0) {
            if (input < 100) {
                answer = 0
            } else {
                input -= 100    //Now have a range 0 to 1796
                answer = Math.constrain(Math.round(input / 18), 0, 100)
            }
        }
        else {
            input *= -1
            //Now have something from 2200 to 0
            if (input < 100) {
                answer = 0
            }
            else {
                input -= 100 //Now 2100 to 0
                answer = Math.constrain(0 - Math.round(input / 21), -100, 0)
            }
        }
        return answer
    }

    /**
    * Read joystick, slider or control knob value
    * @param id is the choice of input, chosen from list
    * Joysticks return values -100 to +100 (0 is centre)
    * Slider or Knob returns value 0 to 100
    * Version returns PCB version number (-1 is unknown)
    * Expansion returns 0 to 4095
    */
    //% block="Read input %input_id"
    //% group="Inputs"
    export function bot_input(input_id: ADC_CH): number {
        // Read the ADC inputs and return
        //Ask for an ADC read
        let readcmd
        let ADCRead
        let returnval
        switch (input_id) {
            case ADC_CH.ADC_CH_LEFTJOY_Y:
                readcmd = ADC_REG_CH_LEFTJOY_Y
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                returnval = processjoystick(ADCRead)
                //debug("LEFTY")
                break
            case ADC_CH.ADC_CH_LEFTJOY_X:
                readcmd = ADC_REG_CH_LEFTJOY_X
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                returnval = processjoystick(ADCRead)
                //debug("LEFTX")
                break
            case ADC_CH.ADC_CH_SLIDE:
                readcmd = ADC_REG_CH_SLIDE
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                returnval = Math.constrain(Math.round(ADCRead / 40), 0, 100)
                //debug("SLIDE")
                break
            case ADC_CH.ADC_CH_EXPANS:
                readcmd = ADC_REG_CH_EXPANS
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                returnval = ADCRead
                //debug("EXPANS")
                break
            case ADC_CH.ADC_CH_RIGHTJOY_Y:
                readcmd = ADC_REG_CH_RIGHTJOY_Y
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                returnval = processjoystick(ADCRead)
                //debug("RIGHTY")
                break
            case ADC_CH.ADC_CH_RIGHTJOY_X:
                readcmd = ADC_REG_CH_RIGHTJOY_X
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                returnval = processjoystick(ADCRead)
                //debug("RIGHTX")
                break
            case ADC_CH.ADC_CH_KNOB:
                readcmd = ADC_REG_CH_KNOB
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                returnval = Math.constrain(Math.round(ADCRead / 40), 0, 100)
                //debug("KNOB")
                break
            case ADC_CH.ADC_CH_VERSION:
                readcmd = ADC_REG_CH_VERSION
                pins.i2cWriteNumber(ADC_ADDR, readcmd, NumberFormat.UInt8LE, false)
                ADCRead = pins.i2cReadNumber(ADC_ADDR, NumberFormat.UInt16BE, false)
                if ((ADCRead > 900) && (ADCRead < 1100)) {
                    returnval = 1       //version1.  5K gnd, 15K + => 1000 +- 10%
                }
                else {
                    returnval = -1       //unknown version
                }
                //debug("VERSION")
                break
            default:
                //Quit function and return an error
                return -1
        }

        return returnval
    }

    /**
    * Read the values of the selected button
    * @param button is the chosen button
    * returned value is a number 1 (Pressed) or 0 (Released)
    */
    //% block="Read button %but_id"
    //% group="Inputs"
    export function bot_buttons(but_id: BUTTON): number {
        // Read GPIO for the buttons A P5, B P11, C P8
        let button_val: number = 0
        if (but_id == BUTTON.A) {
            button_val = pins.digitalReadPin(DigitalPin.P5)
        }
        else if (but_id == BUTTON.B) {
            button_val = pins.digitalReadPin(DigitalPin.P11)
        }
        else if (but_id == BUTTON.C) {
            button_val = pins.digitalReadPin(DigitalPin.P8)
        }
        if (button_val == 0) {
            button_val = 1
        }
        else {
            button_val = 0
        }
        return button_val
    }
}