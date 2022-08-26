import { foreach, instance as container } from '@tuval/core';
import {
    cLeading,
    Color,
    Context,
    ControlTypes,
    cTopLeading,
    cVertical,
    ForEach,
    HDivider,
    HStack,
    IAppStoreService,
    ScrollView,
    State,
    Text,
    UIButton,
    UIController,
    UIImage,
    UIScene,
    VStack,
    FastText,
    IDesktopService,
    IAppStoreItem,
    PositionTypes,
    RoundedRectangle
} from '@tuval/forms';

import { CategoryListView } from '../Views/CategortyView';
import { searchBox } from '../Views/SearchBox';
import { EventBus } from '@tuval/core';
import { DiscoveryController } from './DiscoveryController';
import { TForm, Icon, Spacer } from '@tuval/forms';

declare var gaEvent;
const appsCategoryModel = [
    {
        name: 'Discover',
        icon: '\\e838'
    },
    {
        name: 'All',
        icon: '\\e5c3'
    },
    {
        name: 'Multimedia',
        icon: '\\e02c'
    },
    {
        name: 'Bussiness',
        icon: '\\eb3f'
    },
    {
        name: 'Utilities',
        icon: '\\d1d8'
    },
    {
        name: 'Security',
        icon: '\\e32a'
    },
    {
        name: 'Productivity',
        icon: '\\eb9b'
    },
    {
        name: 'Development',
        icon: '\\f1b7'
    }

]
export class AppController extends UIController {

    private form: TForm;

    @State()
    private selectedCat: string;
    private appStoreService: IAppStoreService;

    @State()
    private selectedApps: any[];

    @State()
    private discoveryController: DiscoveryController;

    @Context()
    private OnCategorySelected(selectedCatName: string) {
        this.selectedCat = selectedCatName;
        this.LoadApps(selectedCatName);
    }

    public OnBindModel(form: TForm) {
        this.form = form;
    }

    private OnInstallApp(app: IAppStoreItem) {
        const desk = container.resolve<IDesktopService>(ControlTypes.IDesktopService);
        setTimeout(() => {
            desk.InstallApp('BPMGenesis', 'stan', app).then(e => {
                EventBus.Default.fire('tuval.desktop.toast', { severity: 'info', summary: 'App Installed', detail: app.name, life: 3000 });
                EventBus.Default.fire('tuval.desktop.installapp', { app: e });

                gaEvent('Application', 'Install', app.name);
            });
        }, 1000);
    }
    protected InitController() {
        this.discoveryController = new DiscoveryController();
        this.appStoreService = container.resolve<IAppStoreService>(ControlTypes.IAppStoreService);
        this.selectedCat = 'All';
        this.LoadApps('All');
    }

    private LoadApps(category: string): void {
        this.appStoreService.GetApps('', category).then((apps: any) => {
            foreach(apps, (app: any) => {
                this.selectedApps = apps;
                /*   const item = new CardViewItem();
                  item.Title = app.name;
                  item.TopTitle = app.vendor;
                  item.SubTitle = app.category;
                  item.Image = app.icon;
                  const button = new Button();
                  button.Text = 'Install';
                  button.Clicked.add(() => {
                      button.Text = 'Installing...';
                      const desk = container.resolve<IDesktopService>(ControlTypes.IDesktopService);
                      setTimeout(() => {
                          desk.InstallApp('BPMGenesis', 'stan', app).then(e => {
                              EventBus.Default.fire('tuval.desktop.toast', { severity: 'info', summary: 'App Installed', detail: app.name, life: 3000 });
                              EventBus.Default.fire('tuval.desktop.installapp', { app: e });
                              button.Text = 'Open';
                              gaEvent('Application','Install',app.name);
                          });
                      }, 1000); */
            });
        });

        /*  const a = new GetAppsRequest();
         a.HandshakeId = 5;
         a.Send().then(apps => {

         }); */
    }

    public LoadView() {
        return UIScene(
            HStack(
                VStack(
                    HStack({ alignment: cLeading, spacing: 8 })(
                        UIButton(
                            RoundedRectangle().backgroundColor('#FF605C').cornerRadius('50%').padding(1).width(11).height(11)
                        ).action(() => this.form.Hide()),
                        UIButton(
                            RoundedRectangle().backgroundColor('#FFBD47').cornerRadius('50%').padding(1).width(11).height(11)
                        ).action(() => this.form.Minimized = true)
                    ).height().padding(20),
                    searchBox(),
                    HDivider().height(10),
                    CategoryListView(appsCategoryModel) as any
                ).width().background('#E8E8E8'),
                VStack({ alignment: cTopLeading })(
                    HStack({ spacing: 5 })(
                        Text(this.selectedCat).fontWeight('500'),
                    ).backgroundColor('#FDFDFD').borderBottom('1px solid #F2F2F2').height(50).onMouseDown((e) => this.form.StartFormDrag(e)),
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
                                        ).backgroundColor('#F1F2F6').cornerRadius(20).width(50).height(20).foregroundColor('#0090F9').fontWeight('600').fontSize('10px')
                                            .action(() => this.OnInstallApp(appInfo)),
                                        HDivider().height(5)
                                    ).borderBottom('solid 1px #EBEBEB'),
                                ).width(250).minWidth('250px').maxWidth('250px').height('').padding(10)

                            )
                        ).wrap('wrap')
                    ).background(Color.white).visible(this.selectedCat !== 'Discover'),
                    ScrollView({ axes: cVertical })(
                        this.discoveryController as any
                    ).visible(this.selectedCat === 'Discover')

                )
            )
        )
    }
}