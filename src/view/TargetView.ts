import { View, RouterView, Route } from "./common";
import { TargetEntity, TargetStatus } from "../entity";
import { prompt, Separator } from "inquirer"
import { getApp } from "..";
import { TargetController } from "../control";


export class TargetView extends RouterView {
    protected choices = [
        new Route("浏览目标", new BrowseTargetView()),
        new Route("新建目标", new CreateTargetView()),
        new Separator(),
        new Route("返回主菜单", null)
    ]
}


export class BrowseTargetView extends View {
    public async invoke(): Promise<void> {
        const user = getApp().getCurrentUser();
        const targets = await (getApp().getController(TargetController) as TargetController).listAllTargetsOfUser(user);

        console.log(targets);
    }
}


export class CreateTargetView extends View {
    public async invoke(): Promise<void> {
        const user = getApp().getCurrentUser();

        enum AnswerKey {
            nameAndDescription = "nameAndDescription",
            shouldSetTimespan = "shouldSetTimespan",
            timespan = "timespan"
        }

        const anwsers = await prompt([
            {
                type: "editor",
                name: AnswerKey.nameAndDescription,
                message: "目标的标题和细节是？",
                default: `

# 第一行是目标的标题
#
# 第一行之后的是内容
# 以“# ”开始的行会被忽略`
            },
            {
                type: "confirm",
                name: AnswerKey.shouldSetTimespan,
                message:"要设置目标的起止时间吗？"
            }
        ])

        console.log(anwsers);
    }
}


export class ModifyTargetView extends View {
    private target: TargetEntity
    private status?: TargetStatus

    public constructor(target: TargetEntity, status?: TargetStatus) {
        super();

        if (!target) {
            throw TypeError("参数 target 不是正确的类型。")
        }

        this.target = target
        this.status = status;
    }

    public async invoke(): Promise<void> {
        if (status) {
            await this.quesionOnChangingTargetStatus();
        } else {
            await this.questionOnChangingTargetPropertis();
        }
    }

    private async quesionOnChangingTargetStatus() {
        const messageMap = new Map([
            [TargetStatus.COMPLETED, "确认完成行动？"],
            [TargetStatus.DELETED, "确认删除行动？"]
        ]);

        const message = messageMap.get(this.status);
        if (!message) {
            throw new TypeError(`参数 status = ${this.status} 尚未支持。`)
        }

        const questionKey = "confirm"
        const answer = await prompt([
            {
                type: "confirm",
                name: questionKey,
                message
            }
        ])

        if (answer.questionKey) {
            // @todo
        }
    }

    private async questionOnChangingTargetPropertis() {
        // @todo
    }
}
