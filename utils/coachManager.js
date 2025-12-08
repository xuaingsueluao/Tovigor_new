/**
 * AI教练全局状态管理
 * 功能：管理选中的AI教练信息，支持本地存储持久化
 * 使用场景：筛选栏选择教练、热身页显示教练、训练页使用教练
 */

const STORAGE_KEY = 'selected_coach'

// 默认教练配置
const DEFAULT_COACHES = {
	vince: {
		value: 'vince',
		label: 'Vince',
		fullName: 'Vince 艾斯',
		englishName: 'Vince Anderson',
		avatar: '/static/icons/partTrainingActivity/AI_coach_Vince.png',
		intro: '专业严谨型教练，擅长帮助学员突破力量瓶颈，打造强健体魄。',
		tags: ['力量训练', '体能提升', '运动康复'],
		gender: 'male',
		badgeBackground: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)'
	},
	vera: {
		value: 'vera',
		label: 'Vera',
		fullName: 'Vera 维拉',
		englishName: 'Vera Williams',
		avatar: '/static/icons/partTrainingActivity/AI_coach_Vera.png',
		intro: '活力鼓励型教练，深入了解女性力量训练痛点，传递热情与能量。',
		tags: ['塑形训练', '柔韧拉伸', '体态矫正'],
		gender: 'female',
		badgeBackground: 'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)'
	}
}

/**
 * 获取所有教练配置
 * @returns {Object} 教练配置对象
 */
export function getAllCoaches() {
	return DEFAULT_COACHES
}

/**
 * 根据 value 获取教练详细信息
 * @param {String} coachValue - 教练的唯一标识（'vince' 或 'vera'）
 * @returns {Object|null} 教练信息对象，如果未找到则返回 null
 */
export function getCoachByValue(coachValue) {
	return DEFAULT_COACHES[coachValue] || null
}

/**
 * 获取当前选中的教练信息
 * @returns {Object|null} 当前选中的教练信息，如果没有选中则返回默认教练（Vince）
 */
export function getSelectedCoach() {
	try {
		const storedValue = uni.getStorageSync(STORAGE_KEY)
		if (storedValue && DEFAULT_COACHES[storedValue]) {
			return DEFAULT_COACHES[storedValue]
		}
		// 默认返回 Vince
		return DEFAULT_COACHES.vince
	} catch (e) {
		console.error('获取选中教练失败:', e)
		return DEFAULT_COACHES.vince
	}
}

/**
 * 设置选中的教练
 * @param {String} coachValue - 教练的唯一标识（'vince' 或 'vera'）
 * @returns {Boolean} 是否设置成功
 */
export function setSelectedCoach(coachValue) {
	try {
		if (!DEFAULT_COACHES[coachValue]) {
			console.error('无效的教练标识:', coachValue)
			return false
		}
		uni.setStorageSync(STORAGE_KEY, coachValue)
		console.log('已选择教练:', coachValue)
		return true
	} catch (e) {
		console.error('保存选中教练失败:', e)
		return false
	}
}

/**
 * 清除选中的教练（重置为默认）
 */
export function clearSelectedCoach() {
	try {
		uni.removeStorageSync(STORAGE_KEY)
		console.log('已清除教练选择')
	} catch (e) {
		console.error('清除教练选择失败:', e)
	}
}

/**
 * 获取教练选项列表（用于筛选栏展示）
 * @returns {Array} 教练选项数组
 */
export function getCoachOptions() {
	return [
		{
			value: 'vince',
			label: 'Vince 艾斯',
			avatar: '/static/icons/partTrainingActivity/AI_coach_Vince.png'
		},
		{
			value: 'vera',
			label: 'Vera 维拉',
			avatar: '/static/icons/partTrainingActivity/AI_coach_Vera.png'
		}
	]
}

/**
 * 获取完整的教练信息（包含详情）
 * @param {String} coachValue - 教练的唯一标识
 * @returns {Object} 完整的教练信息对象
 */
export function getCoachDetailInfo(coachValue) {
	const coach = DEFAULT_COACHES[coachValue]
	if (!coach) {
		return null
	}
	
	return {
		...coach,
		// 为 BubbleDialogBox 组件准备的属性
		roleLabel: coach.fullName,
		avatarUrl: coach.avatar
	}
}
