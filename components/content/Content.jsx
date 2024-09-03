import {
    CHANGE_ROOM_NAME,
    ADD_MEMBERS,
    MEMBERS
} from "@/constants/constant";

export const optionContent = [
    {
        id: 1,
        label: 'Tùy chỉnh',
        options: [
            {
                modals: CHANGE_ROOM_NAME,
                label: 'Đổi tên nhóm',
                icon: 'edit'
            },
            {
                modals: ADD_MEMBERS,
                label: 'Thêm thành viên',
                icon: 'addusergroup'
            },
        ]
    },
    {
        id: 2,
        label: 'Thông tin đoạn chat',
        options: [
            {
                modals: MEMBERS,
                label: 'Xem thành viên',
                icon: 'user'
            }
        ]
    },
    {
        id: 3,
        label: 'Quyền riêng tư & hỗ trợ',
        options: [
            {
                modals: null,
                label: 'Rời nhóm chat',
                icon: 'logout'
            }
        ]
    }
]