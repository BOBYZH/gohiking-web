import { toBeInTheDocument, toHaveAttribute } from '@testing-library/jest-dom/matchers';
import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import PathwayCard from './PathwayCard';

expect.extend({ toBeInTheDocument });
expect.extend({ toHaveAttribute });


describe('Article Test', () => {
    const testData = {
        pathLink: 'testLink',
        avatar: 'testAvatar',
        avatarAlt: 'testAvatarAlt',
        title: 'testTitle',
        location: 'testLocation',
        miles: 10,
        favorite: false,
    }

    it('Component正確Render', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <PathwayCard
                pathLink={testData.pathLink}
                avatar={testData.avatar}
                avatarAlt={testData.avatarAlt}
                title={testData.title}
                location={testData.location}
                miles={testData.miles}
                favorite={testData.favorite}
            />,
            div);
    });

    it('Card 內容資料相符', () => {
        const { getByText, container } = render(
            <PathwayCard
                pathLink={testData.pathLink}
                avatar={testData.avatar}
                avatarAlt={testData.avatarAlt}
                title={testData.title}
                location={testData.location}
                miles={testData.miles}
                favorite={testData.favorite}
            />
        );
        const href = container.querySelector('[href=' + testData.pathLink + ']');
        const avatar = container.querySelector('[src=' + testData.avatar + ']');
        const avatarAlt = container.querySelector('[alt=' + testData.avatarAlt + ']');
        const title = getByText(testData.title);
        const location = getByText(testData.location);
        const miles = getByText('全程約 ' + testData.miles + ' km');

        expect(href).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', testData.avatar);
        expect(avatarAlt).toHaveAttribute('alt', testData.avatarAlt);
        expect(title).toBeInTheDocument();
        expect(location).toBeInTheDocument();
        expect(miles).toBeInTheDocument();
    });

    it('Favorite Icon 狀態為正確值 (預設false)', () => {
        //Arrange
        const { getByTestId } = render(
            <PathwayCard
                pathLink={testData.pathLink}
                avatar={testData.avatar}
                avatarAlt={testData.avatarAlt}
                title={testData.title}
                location={testData.location}
                miles={testData.miles}
                favorite={testData.favorite}
            />
        );
        //Act
        const iconStatus = getByTestId('favorite').querySelector('[type="checkbox"]');
        //Assert
        expect(iconStatus).toHaveProperty('checked', testData.favorite)
    });


});