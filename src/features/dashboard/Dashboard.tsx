import axiosInstance from '@/core/config/axios'
import DashboardLayout from '@/core/layouts/DashboardLayout'
import { useLoadingsStore } from '@/core/stores/useLoadingsStore'
import StatisticCard from '@/features/dashboard/components/StatisticCard'
import CCard from '@/shared/components/CCard'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import DownloadSection from '@/features/landing/components/DownloadSection'
import { useSelfStore } from '@/core/stores/useSelfStore'
import { ROLE_ADMIN } from '@/modules/roles/constants/roles'

type Statistics = {
    totalAllRoles: number
    totalAllPermissions: number
    totalAllUsers: number
    totalAdminUsers: number
    totalAnalystUsers: number
    totalUserUsers: number
    totalAllFollows: number
    totalAllPosts: number
    totalAdminPosts: number
    totalAnalystPosts: number
    totalUserPosts: number
    totalAllPostLikes: number
    totalAllCommentLikes: number
    totalAllPostComments: number
    totalAllSavedPosts: number
}

const LOADING_KEY = 'dashboard.index'

function Dashboard() {
    const self = useSelfStore((state) => state.self)
    const isSelfLoading = useLoadingsStore((state) => state.isLoading('self'))

    const [statistics, setStatistics] = useState<Statistics | undefined>()
    const isStatsLoading = useLoadingsStore((state) =>
        state.isLoading(LOADING_KEY),
    )

    useEffect(() => {
        useLoadingsStore.getState().startLoading(LOADING_KEY)
        axiosInstance
            .get(`/api/dashboard`)
            .then((response) => {
                const data = response.data.data
                setStatistics(data)
            })
            .catch((e) => {
                if (isAxiosError(e)) {
                    throw e
                }
            })
            .finally(() => {
                useLoadingsStore.getState().stopLoading(LOADING_KEY)
            })
    }, [])

    if (isStatsLoading && isSelfLoading) return <div>Loading...</div>

    return (
        <DashboardLayout>
            <header className="mb-6">
                <h2 className="text-primary text-4xl font-semibold">
                    Dashboard
                </h2>
            </header>
            {statistics === undefined && self?.role?.name !== ROLE_ADMIN && (
                <DownloadSection />
            )}

            {statistics && self?.role?.name === ROLE_ADMIN && (
                <CCard className={'bg-primary space-y-4 px-6 pt-4! pb-8'}>
                    <header>
                        <h3 className="text-2xl font-semibold text-white">
                            Key Metrics Overview
                        </h3>
                    </header>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/* User & Role Statistics */}
                        <StatisticCard
                            title="Total Users"
                            value={statistics.totalAllUsers}
                        />
                        <StatisticCard
                            title="Total Roles"
                            value={statistics.totalAllRoles}
                        />
                        <StatisticCard
                            title="Total Permissions"
                            value={statistics.totalAllPermissions}
                        />
                        <StatisticCard
                            title="Admin Users"
                            value={statistics.totalAdminUsers}
                            description={`${statistics.totalAdminUsers} of ${statistics.totalAllUsers} users`}
                        />
                        <StatisticCard
                            title="Analyst Users"
                            value={statistics.totalAnalystUsers}
                            description={`${statistics.totalAnalystUsers} of ${statistics.totalAllUsers} users`}
                        />
                        <StatisticCard
                            title="Standard Users"
                            value={statistics.totalUserUsers}
                            description={`${statistics.totalUserUsers} of ${statistics.totalAllUsers} users`}
                        />

                        {/* Content Statistics */}
                        <StatisticCard
                            title="Total Posts"
                            value={statistics.totalAllPosts}
                        />
                        <StatisticCard
                            title="Admin Posts"
                            value={statistics.totalAdminPosts}
                            description={`${statistics.totalAdminPosts} of ${statistics.totalAllPosts} posts`}
                        />
                        <StatisticCard
                            title="Analyst Posts"
                            value={statistics.totalAnalystPosts}
                            description={`${statistics.totalAnalystPosts} of ${statistics.totalAllPosts} posts`}
                        />
                        <StatisticCard
                            title="User Posts"
                            value={statistics.totalUserPosts}
                            description={`${statistics.totalUserPosts} of ${statistics.totalAllPosts} posts`}
                        />
                        <StatisticCard
                            title="Total Follows"
                            value={statistics.totalAllFollows}
                        />
                        <StatisticCard
                            title="Saved Posts"
                            value={statistics.totalAllSavedPosts}
                        />

                        {/* Engagement Statistics */}
                        <StatisticCard
                            title="Total Post Likes"
                            value={statistics.totalAllPostLikes}
                        />
                        <StatisticCard
                            title="Total Comment Likes"
                            value={statistics.totalAllCommentLikes}
                        />
                        <StatisticCard
                            title="Total Post Comments"
                            value={statistics.totalAllPostComments}
                        />
                    </div>
                </CCard>
            )}
        </DashboardLayout>
    )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
