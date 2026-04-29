import { BarrelAttachment, BarrelAttachmentTypeEnum } from "@/models/Attachement/BarrelAttachment"

export default class AttachmentCollection {
    attachmentList: BarrelAttachment[]

    constructor() {
        this.attachmentList = attachmentCollection()
    }

    getBySizeAndType(size: number, type: BarrelAttachmentTypeEnum): BarrelAttachment[] {
        return this.attachmentList.filter((attachment: BarrelAttachment) => attachment.size === size && attachment.type === type)
    }
}

const attachmentCollection = (): BarrelAttachment[] => {
    return [
        //Size 1 - Ballistic
        new BarrelAttachment("Compensator Torrent 1", BarrelAttachmentTypeEnum.Ballistic, 1, 1.175, 1.075),
        new BarrelAttachment("Compensator Stark 1", BarrelAttachmentTypeEnum.Ballistic, 1, 1, 0.8),
        new BarrelAttachment("Compensator Sion \"Tweaker\" 1", BarrelAttachmentTypeEnum.Ballistic, 1, 1, 1.125),
        new BarrelAttachment("Suppressor Quell 1", BarrelAttachmentTypeEnum.Ballistic, 1, 1, 0.95),
        new BarrelAttachment("Suppressor Tacit 1", BarrelAttachmentTypeEnum.Ballistic, 1, 1, 0.92),

        //Size 1 - Energy
        new BarrelAttachment("Stabilizer Escalate 1", BarrelAttachmentTypeEnum.Energy, 1, 0.9, 1.3),

        //Size 2 - Ballistic
        new BarrelAttachment("Compensator Vera 2", BarrelAttachmentTypeEnum.Ballistic, 2, 1, 1.06),
        new BarrelAttachment("Compensator Torrent 2", BarrelAttachmentTypeEnum.Ballistic, 2, 0.95, 1),
        new BarrelAttachment("Compensator Sion \"Tweaker\" 2", BarrelAttachmentTypeEnum.Ballistic, 2, 0.9, 1),
        new BarrelAttachment("Compensator Sion \"Scorched\" 2", BarrelAttachmentTypeEnum.Ballistic, 2, 0.9, 1),
        new BarrelAttachment("Suppressor Tacit 2", BarrelAttachmentTypeEnum.Ballistic, 2, 0.92, 1),

        //Size 2 - Energy
        new BarrelAttachment("Stabilizer Escalate 2", BarrelAttachmentTypeEnum.Energy, 2, 0.95, 1.1),
        new BarrelAttachment("Stabilizer Emod \"Tweaker\" 2", BarrelAttachmentTypeEnum.Energy, 2, 1.125, 1),

        //Size 3 - Ballistic
        new BarrelAttachment("Compensator Vera 3", BarrelAttachmentTypeEnum.Ballistic, 3, 1, 1.15),
        new BarrelAttachment("Compensator Stark 3", BarrelAttachmentTypeEnum.Ballistic, 3, 1.075, 1.15),
        new BarrelAttachment("Suppressor Tacit 3", BarrelAttachmentTypeEnum.Ballistic, 3, 0.92, 1),

        //Size 3 - Energy
    ]
}
