export default class Summary extends ui.view.DefaultTheme.SummaryUI {
    constructor() {
        super();
        this.listSummary.renderHandler = Laya.Handler.create(this, this.renderSummary, null, false);
        this.listSelectedTalents.renderHandler = Laya.Handler.create(this, this.renderTalent, null, false);
        this.btnAgain.on(Laya.Event.CLICK, this, this.onAgain);

        this.btnHome = Laya.View.createComp($_.findInView(ui.view.DefaultTheme.SummaryUI.uiView, 'btnAgain'));
        this.btnHome.label = $lang.UI_Back_Home;
        this.btnHome.name = 'btnHome'; // 给它命名，方便视图自动配置
        this.btnAgain.parent.addChild(this.btnHome);
        this.btnHome.on(Laya.Event.CLICK, this, this.onHome);

        this.on(Laya.Event.RESIZE, this, this.onResize);
    }

    #selectedTalent;
    #enableExtend;

    onResize() {
        const space = 40;
        const totalWidth = this.btnAgain.width + this.btnHome.width + space;
        this.btnAgain.centerX = - (this.btnHome.width + space) / 2;
        this.btnHome.centerX = (this.btnAgain.width + space) / 2;
        this.btnAgain.bottom = this.btnHome.bottom = 100;
    }

    onAgain() {
        core.talentExtend(this.#selectedTalent);
        core.times ++;
        if ($ui.lastMode) {
            $ui.switchView($ui.lastMode);
        } else {
            $ui.switchView(UI.pages.MAIN);
        }
    }

    onHome() {
        core.talentExtend(this.#selectedTalent);
        core.times ++;
        $ui.switchView(UI.pages.MAIN);
    }

    init({talents, enableExtend}) {
        const {summary, lastExtendTalent} = core;
        this.#enableExtend = enableExtend;

        this.listSummary.array = [
            [core.PropertyTypes.HCHR, $lang.UI_Property_Charm],
            [core.PropertyTypes.HINT, $lang.UI_Property_Intelligence],
            [core.PropertyTypes.HSTR, $lang.UI_Property_Strength],
            [core.PropertyTypes.HMNY, $lang.UI_Property_Money],
            [core.PropertyTypes.HSPR, $lang.UI_Property_Spirit],
            [core.PropertyTypes.HAGE, $lang.UI_Final_Age],
            [core.PropertyTypes.SUM, $lang.UI_Total_Judge],
        ].map(([type, key]) => {
            const data = summary[type];
            return {
                label: `${key}${$lang.UI_Colon} ${data.value} ${$lang[data.judge]}`,
                grade: data.grade,
            }
        });

        talents.sort(({id:a, grade:ag}, {id:b, grade:bg},)=>{
            if(a == lastExtendTalent) return -1;
            if(b == lastExtendTalent) return 1;
            return bg - ag;
        });
        if(this.#enableExtend) {
            this.#selectedTalent = talents[0].id;
        } else {
            this.#selectedTalent = lastExtendTalent;
        }
        this.listSelectedTalents.array = talents;
        this.onResize();
    }
    renderSummary(box) {
        const {label, grade} = box.dataSource;
        box.label = label;
        $_.deepMapSet(box, $ui.common.summary[grade]);
    }
    renderTalent(box) {
        const dataSource = box.dataSource;
        box.label = $_.format($lang.F_TalentSelection, dataSource);
        const style = $ui.common.card[dataSource.grade];
        $_.deepMapSet(box, dataSource.id == this.#selectedTalent? style.selected: style.normal);
        box.getChildByName('blank').pause = dataSource.id != this.#selectedTalent;
        box.off(Laya.Event.CLICK, this, this.onSelectTalent);
        box.on(Laya.Event.CLICK, this, this.onSelectTalent, [dataSource.id]);
    }

    onSelectTalent(talentId) {
        if(!this.#enableExtend) {
            return $$event('message', ['M_DisableExtendTalent']);
        }
        if(talentId == this.#selectedTalent) {
            this.#selectedTalent = null;
        } else {
            this.#selectedTalent = talentId;
        }

        this.listSelectedTalents.refresh();
    }
}