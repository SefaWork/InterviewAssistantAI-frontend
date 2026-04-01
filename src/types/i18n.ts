/**Stores localization key and parameters required to properly localize a message. */
export type LocalizedMessage = {
    /**Localization key of the message. */
    key: string,

    /**List of parameters to pass to the localization message. */
    params?: Record<string, unknown>
}