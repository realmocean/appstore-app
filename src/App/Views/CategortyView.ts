import { HStack, VStack, cTopLeading, ForEach, cLeading, Icon, Text, Color, CornerRadiusTypes, cTop, bindState } from '@tuval/forms';
import { int } from '@tuval/core';


export function CategoryListView(appsCategoryModel: any) {
    const [selectedIndex, setSelectedIndex] = bindState(-1);
    return ({ OnCategorySelected }) => {
        return (
            VStack({ alignment: cTop })(
                ...ForEach(appsCategoryModel)((catItem: any, index: int) =>
                    HStack({ alignment: cLeading, spacing: 10 })(
                        Icon(catItem.icon).size(20).foregroundColor('#0994F5'),
                        Text(catItem.name)
                    )
                        .width('90%')
                        .cornerRadius(CornerRadiusTypes.Rounded)
                        .height()
                        .padding(10)
                        .backgroundColor(selectedIndex === index ? '#CECECE' : '')
                        .backgroundColor({ hover: '#CECECE66' })
                        //.foregroundColor({ hover: 'white' })
                        .cursor('pointer')
                        .onClick(() => { setSelectedIndex(index); OnCategorySelected(catItem.name) })
                )

            )
                .initial({ width: '1px' }).animate({ width: '200px' })
                .width()


        )
    }
}