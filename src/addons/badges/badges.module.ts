// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { APP_INITIALIZER, NgModule, Type } from '@angular/core';
import { Routes } from '@angular/router';

import { AddonBadgesMyBadgesLinkHandler } from './services/handlers/mybadges-link';
import { AddonBadgesBadgeLinkHandler } from './services/handlers/badge-link';
import { AddonBadgesBadgeClassLinkHandler } from './services/handlers/badgeclass-link';
import { CoreContentLinksDelegate } from '@features/contentlinks/services/contentlinks-delegate';
import { CoreUserDelegate } from '@features/user/services/user-delegate';
import { AddonBadgesUserHandler } from './services/handlers/user';
import { CoreMainMenuTabRoutingModule } from '@features/mainmenu/mainmenu-tab-routing.module';
import { CorePushNotificationsDelegate } from '@features/pushnotifications/services/push-delegate';
import { AddonBadgesPushClickHandler } from './services/handlers/push-click';
import { CoreTagAreaDelegate } from '@features/tag/services/tag-area-delegate';
import { AddonBadgesTagAreaHandler } from './services/handlers/tag-area';

/**
 * Get badges services.
 *
 * @returns Returns badges services.
 */
export async function getBadgesServices(): Promise<Type<unknown>[]> {
    const { AddonBadgesProvider } = await import('@addons/badges/services/badges');

    return [
        AddonBadgesProvider,
    ];
}

const mainMenuRoutes: Routes = [
    {
        path: 'badge',
        loadChildren: () => import('./badge-lazy.module'),
    },
    {
        path: 'badges',
        loadChildren: () => import('./badges-lazy.module'),
    },
    {
        path: 'badgeclass',
        loadChildren: () => import('./badgeclass-lazy.module'),
    },
];

@NgModule({
    imports: [
        CoreMainMenuTabRoutingModule.forChild(mainMenuRoutes),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useValue: () => {
                CoreContentLinksDelegate.registerHandler(AddonBadgesMyBadgesLinkHandler.instance);
                CoreContentLinksDelegate.registerHandler(AddonBadgesBadgeLinkHandler.instance);
                CoreContentLinksDelegate.registerHandler(AddonBadgesBadgeClassLinkHandler.instance);
                CoreUserDelegate.registerHandler(AddonBadgesUserHandler.instance);
                CorePushNotificationsDelegate.registerClickHandler(AddonBadgesPushClickHandler.instance);
                CoreTagAreaDelegate.registerHandler(AddonBadgesTagAreaHandler.instance);
            },
        },
    ],
})
export class AddonBadgesModule {}
