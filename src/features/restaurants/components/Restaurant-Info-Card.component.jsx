import React from 'react';
import { SvgXml } from 'react-native-svg';
import star from '../../../../assets/star';
import open from '../../../../assets/open';
import Favourite from '../../../utility-components/favourites/favourite.component';
import Spacer from '../../../utility-components/spacer/spacer.component';
import Text from '../../../utility-components/typography/text.component';
import {
    RestaurantCard,
    RestaurantCardCover,
    Info,
    Rating,
    Address,
    Section,
    SectionEnd,
    Icon,
} from './Restaurant-Info-Card.styles';

const RestaurantInfoCard = ({ restaurant }) => {
    const { name, icon, photos, address, isOpenNow, rating, isClosedTemporarily, placeId } =
        restaurant;

    const ratingArray = Array.from(new Array(Math.floor(rating)));

    return (
        <RestaurantCard elevation={5}>
            <Favourite restaurant={restaurant} />
            <RestaurantCardCover
                key={{ name }}
                source={{
                    uri: photos[0],
                }}
            />
            <Info>
                <Text variant='label'>{name}</Text>
                <Section>
                    <Rating>
                        {ratingArray.map((_, i) => (
                            <SvgXml
                                key={`star-${placeId}-${i}}`}
                                xml={star}
                                width={20}
                                height={20}
                            />
                        ))}
                    </Rating>
                    <SectionEnd>
                        {isClosedTemporarily && <Text variant='error'>CLOSED TEMPORARILY</Text>}
                        <Spacer position='left' size='large'>
                            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
                        </Spacer>
                        <Spacer position='left' size='large'>
                            <Icon source={{ uri: icon }} />
                        </Spacer>
                    </SectionEnd>
                </Section>

                <Address>{address}</Address>
            </Info>
        </RestaurantCard>
    );
};

export default RestaurantInfoCard;
