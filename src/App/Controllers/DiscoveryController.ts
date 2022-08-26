import { foreach, instance as container } from '@tuval/core';
import { UIButton } from '@tuval/forms';
import {
    cLeading,
    Color,
    ControlTypes,
    cTopLeading,
    cVertical,
    FastText,
    ForEach,
    HDivider,
    HStack,
    IAppStoreService,
    ScrollView,
    Spacer,
    State,
    Text,
    UIController,
    UIImage,
    UIScene,
    VStack,
} from '@tuval/forms';

export class DiscoveryController extends UIController {

    @State()
    private selectedApps: any[];
    appStoreService: any;

    protected InitController() {
        this.appStoreService = container.resolve<IAppStoreService>(ControlTypes.IAppStoreService);
        this.LoadApps('All');
    }

    private LoadApps(category: string): void {
        this.appStoreService.GetApps('', category).then((apps: any) => {
            foreach(apps, (app: any) => {
                this.selectedApps = apps;
            });
        });
    }

    public LoadView() {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing:10 })(
                    HStack({ alignment: cTopLeading, spacing: 20 })(
                        VStack({ alignment: cTopLeading, spacing: 5 })(
                            Text('PROCETRA').foregroundColor('#259BFA').fontSize('12px').fontWeight('600'),
                            Text('Level Up Your Business').fontWeight('700'),
                            Text('Process Mining').foregroundColor('gray'),
                            UIImage('http://127.0.0.1:5000/static/images/procetra.png').height(200)
                        ),
                        VStack({ alignment: cTopLeading, spacing: 5 })(
                            Text('PROCETRA').foregroundColor('#259BFA').fontSize('12px').fontWeight('600'),
                            Text('Level Up Your Business').fontWeight('700'),
                            Text('Process Mining').foregroundColor('gray'),
                            UIImage('http://127.0.0.1:5000/static/images/procetra1.png').height(200)
                        )
                    ).width().height(),
                    HDivider().width('100%').height(1).background('#E5E5E5'),
                    HStack(
                        Text('Browse Better').fontSize('16px').fontWeight('700'),
                        Spacer(),
                        Text('See All').foregroundColor('#259BFA').fontSize('12px').fontWeight('600')
                    ).height(),
                    ScrollView({ axes: cVertical })(
                        HStack({ alignment: cTopLeading, spacing: 20 })(
                            ...ForEach(this.selectedApps)(appInfo =>
                                HStack({ alignment: cTopLeading, spacing: 10 })(
                                    UIImage(appInfo.icon).width(58).height(58),
                                    VStack({ alignment: cLeading, spacing: 5 })(
                                        FastText(appInfo.name).fontWeight('500'),
                                        FastText(appInfo.category).foregroundColor('#949494').fontSize('12px'),
                                        FastText(appInfo.vendor).foregroundColor('#CDCDCD').fontSize('10px'),
                                        UIButton(
                                            FastText('GET')
                                        ).backgroundColor('#F1F2F6').cornerRadius(20).width(50).height(20).foregroundColor('#0090F9').fontWeight('600').fontSize('10px'),
                                        //.action(()=> this.OnInstallApp(appInfo)),
                                        HDivider().height(5)
                                    ).borderBottom('solid 1px #EBEBEB'),
                                ).width(250).minWidth('250px').maxWidth('250px').height('').padding(10)

                            )
                        ).wrap('wrap')
                    ).background(Color.white)
                ).padding(20)
            ).background(Color.white)
        )
    }
}